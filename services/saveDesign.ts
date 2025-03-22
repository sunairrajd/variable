import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, Timestamp, doc, getDoc } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  // Add your Firebase config here
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

/**
 * Uploads an image to Firebase Storage
 * @param imageBlob - The image blob to upload
 * @param path - The storage path
 * @returns Promise with the download URL
 */
export const uploadImageToStorage = async (imageBlob: Blob, path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, imageBlob);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image to Firebase Storage:', error);
    throw error;
  }
};

/**
 * Saves design data to Firestore and images to Storage
 * @param designImageBlob - The design image blob
 * @param renderInfo - The design render information
 * @returns Promise with the saved design ID and shareable URL
 */
export const saveDesign = async (designImageBlob: Blob, renderInfo: any): Promise<{designId: string, shareableUrl: string}> => {
  try {
    const timestamp = Date.now();
    
    // 1. Upload the design image to Firebase Storage
    const imagePath = `images/design_${timestamp}.png`;
    const imageURL = await uploadImageToStorage(designImageBlob, imagePath);
    
    // 2. Convert renderInfo to JSON and upload as a file
    const jsonBlob = new Blob([JSON.stringify(renderInfo)], { type: 'application/json' });
    const jsonPath = `designs/json_${timestamp}.json`;
    const jsonURL = await uploadImageToStorage(jsonBlob, jsonPath);
    
    // 3. Save the design metadata to Firestore
    const designData = {
      userId: 'sunair',
      phone: '+918826475293',
      productId: 'make',
      designName: 'generic',
      imageURL: 'www.google.com', // Placeholder URL
      productionimageURL: imageURL, // The actual saved PNG
      jsonURL: jsonURL, // URL to the JSON file
      createdAt: Timestamp.now()
    };
    
    const designsCollection = collection(db, 'savedDesigns');
    const docRef = await addDoc(designsCollection, designData);
    
    console.log('Design saved successfully with ID:', docRef.id);
    
    // Create a shareable URL using the productId from designData
    const shareableUrl = `/${designData.productId}/${docRef.id}`;
    
    return {
      designId: docRef.id,
      shareableUrl
    };
  } catch (error) {
    console.error('Error saving design:', error);
    throw error;
  }
};

/**
 * Helper function to convert canvas to blob
 * @param canvas - The HTML canvas element
 * @returns Promise with the blob
 */
export const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to create blob from canvas'));
    }, 'image/png');
  });
};

/**
 * Fetches a design by its ID
 * @param designId - The ID of the design to fetch
 * @returns Promise with the design data
 */
export const getDesignById = async (designId: string) => {
  try {
    const designDocRef = doc(db, 'savedDesigns', designId);
    const designDoc = await getDoc(designDocRef);
    
    if (!designDoc.exists()) {
      throw new Error(`Design with ID ${designId} not found`);
    }
    
    return {
      id: designDoc.id,
      ...designDoc.data()
    };
  } catch (error) {
    console.error('Error fetching design:', error);
    throw error;
  }
};
