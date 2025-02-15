'use client'

import { storage, db } from '@/services/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

const COLLECTION_NAME = 'database'



export const uploadImageToFirebase = async (imageBlob: Blob): Promise<string> => {
  try {
    // Create a unique filename with timestamp
    const filename = `sketch_${Date.now()}.png`
    
    // Create a reference to the file location in Firebase Storage
    const storageRef = ref(storage, `images/${filename}`)
    
    // Upload the blob
    const snapshot = await uploadBytes(storageRef, imageBlob)
    console.log('Successfully uploaded image to Firebase')
    
    // Get the download URL
    const downloadUrl = await getDownloadURL(snapshot.ref)
    console.log('Image URL:', downloadUrl)
    
    // Store upload details in Firestore
    await saveUploadDetailsToFirestore(filename, downloadUrl, '123-456-7890', 'unique-id-123', { key: 'value' })
    
    return downloadUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

// Function to save upload details to Firestore
const saveUploadDetailsToFirestore = async (filename: string, url: string, phoneNumber: string = null, uid: string = null, designData: object = null) => {
  const fileRef = doc(db, COLLECTION_NAME, filename)

  const uploadInfo = {
    filename: filename,
    url: url,
    phoneNumber: phoneNumber,
    uid: uid,
    createdAt: new Date(),
    designData: designData,
  }

  try {
    await setDoc(fileRef, uploadInfo)
    console.log('Upload details saved successfully:', uploadInfo)
  } catch (error) {
    console.error('Error saving upload details:', error.message)
  }
}

// // Example function to handle image upload
// export const handleImageUpload = async (imageBlob: Blob) => {
//   if (imageBlob) {
//     const imageUrl = await uploadImageToFirebase(imageBlob) // Upload image and get URL
//     // You can perform additional actions with the imageUrl if needed
//   } else {
//     console.error('No image provided for upload.')
//   }
// }
