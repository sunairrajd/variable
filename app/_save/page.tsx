"use client"
// import React, { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { Button } from "@/components/ui/button"
// import { useRouter } from 'next/navigation'
// import { logoutUser } from '@/services/auth'
// import { useAuthContext } from '@/services/AuthContext'
// import LoginModal from '@/components/LoginModal'

// Define a type for our design items
// interface SavedDesign {
//   id: string;
//   name: string;
//   imageUrl: string;
//   tshirtColorHex: string;
//   customName1: string;
//   customName2: string;

//   dateCreated: string;
//   // Add other properties from renderInfo as needed
// }

export default function SavedDesignsPage() {
  // const router = useRouter();
  // const { user, loading } = useAuthContext();
  // const [designs, setDesigns] = useState<SavedDesign[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // useEffect(() => {
  //   // In a real app, you would fetch this data from your backend or localStorage
  //   // For now, we'll use mock data
  //   const mockDesigns: SavedDesign[] = [
  //     {
  //       id: '1',
  //       name: 'Summer Vibes',
  //       imageUrl: '/mock-designs/design1.jpg',
  //       tshirtColorHex: '#FF5733',
  //       customName1: 'Summer',
  //       customName2: 'Vibes',
  //       dateCreated: '2023-06-15'
  //     },
  //     {
  //       id: '2',
  //       name: 'Winter Blues',
  //       imageUrl: '/mock-designs/design2.jpg',
  //       tshirtColorHex: '#3366FF',
  //       customName1: 'Winter',
  //       customName2: 'Blues',
  //       dateCreated: '2023-07-22'
  //     },
  //     {
  //       id: '3',
  //       name: 'Autumn Leaves',
  //       imageUrl: '/mock-designs/design3.jpg',
  //       tshirtColorHex: '#FF9900',
  //       customName1: 'Autumn',
  //       customName2: 'Leaves',
  //       dateCreated: '2023-08-10'
  //     },
  //     {
  //       id: '4',
  //       name: 'Spring Bloom',
  //       imageUrl: '/mock-designs/design4.jpg',
  //       tshirtColorHex: '#66CC66',
  //       customName1: 'Spring',
  //       customName2: 'Bloom',
  //       dateCreated: '2023-09-05'
  //     },
  //     {
  //       id: '5',
  //       name: 'Midnight Dream',
  //       imageUrl: '/mock-designs/design5.jpg',
  //       tshirtColorHex: '#333366',
  //       customName1: 'Midnight',
  //       customName2: 'Dream',
  //       dateCreated: '2023-10-18'
  //     },
  //     {
  //       id: '6',
  //       name: 'Urban Style',
  //       imageUrl: '/mock-designs/design6.jpg',
  //       tshirtColorHex: '#999999',
  //       customName1: 'Urban',
  //       customName2: 'Style',
  //       dateCreated: '2023-11-30'
  //     },
  //   ];

  //   // Simulate loading
  //   setTimeout(() => {
  //     setDesigns(mockDesigns);
  //     setIsLoading(false);
  //   }, 800);
  // }, []);

  // const handleLogout = async () => {
  //   const result = await logoutUser();
  //   if (!result.success) {
  //     console.error("Error during logout:", result.error);
  //   }
  // };

  // const handleDesignClick = (design: SavedDesign) => {
  //   // Construct URL with all the design parameters
  //   const params = new URLSearchParams();
  //   params.append('tshirtColorHex', design.tshirtColorHex);
  //   params.append('customName1', design.customName1);
  //   params.append('customName2', design.customName2);
  //   // Add other parameters as needed
    
  //   router.push(`/make?${params.toString()}`);
  // };

  // return (
  //   <div className="min-h-screen bg-gray-50">
  //     <header className="bg-white shadow-sm p-4 fixed top-0 left-0 right-0 z-50 flex justify-between items-center">
  //       <Link href="/">
  //         <img src="/var.svg" alt="Logo" className="h-4" />
  //       </Link>
  //       <div className="flex space-x-4 items-center">
  //         {!loading && (
  //           user ? (
  //             <div className="flex items-center space-x-4">
  //               <div className="flex items-center">
  //                 <span className="text-sm text-gray-700">
  //                   {user.phoneNumber || "User"}
  //                 </span>
  //               </div>
  //               <Button variant="outline" onClick={handleLogout}>
  //                 Logout
  //               </Button>
  //             </div>
  //           ) : (
  //             <Button variant="outline" onClick={() => setIsLoginModalOpen(true)}>
  //               Login
  //             </Button>
  //           )
  //         )}
  //         <Button variant="default" onClick={() => router.push('/make')}>
  //           Create New Design
  //         </Button>
  //       </div>
  //     </header>

  //     <main className="container mx-auto pt-20 px-4 pb-12">
  //       <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Designs</h1>
  //       <p className="text-gray-600 mb-8">
  //         {user ? `Your custom t-shirt designs` : `Login to view your saved designs`}
  //       </p>

  //       {loading ? (
  //         <div className="flex justify-center items-center h-64">
  //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
  //         </div>
  //       ) : !user ? (
  //         <div className="text-center py-16 bg-white rounded-lg shadow-sm">
  //           <h3 className="text-lg font-medium text-gray-900 mb-2">Please login to view your designs</h3>
  //           <p className="text-gray-500 mb-6">Login with your phone number to access your saved designs</p>
  //           <Button onClick={() => setIsLoginModalOpen(true)}>
  //             Login with Phone
  //           </Button>
  //         </div>
  //       ) : isLoading ? (
  //         <div className="flex justify-center items-center h-64">
  //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
  //         </div>
  //       ) : designs.length === 0 ? (
  //         <div className="text-center py-16 bg-white rounded-lg shadow-sm">
  //           <h3 className="text-lg font-medium text-gray-900 mb-2">No saved designs yet</h3>
  //           <p className="text-gray-500 mb-6">Create your first design to see it here</p>
  //           <Button onClick={() => router.push('/make')}>
  //             Create a Design
  //           </Button>
  //         </div>
  //       ) : (
  //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  //           {designs.map((design) => (
  //             <div 
  //               key={design.id} 
  //               className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
  //               onClick={() => handleDesignClick(design)}
  //             >
  //               <div 
  //                 className="h-48 bg-gray-200 relative"
  //                 style={{ 
  //                   backgroundColor: design.tshirtColorHex,
  //                   backgroundImage: design.imageUrl ? `url(${design.imageUrl})` : 'none',
  //                   backgroundSize: 'cover',
  //                   backgroundPosition: 'center'
  //                 }}
  //               >
  //                 {!design.imageUrl && (
  //                   <div className="absolute inset-0 flex items-center justify-center">
  //                     <span className="text-white text-lg font-medium">
  //                       {design.customName1} {design.customName2}
  //                     </span>
  //                   </div>
  //                 )}
  //               </div>
  //               <div className="p-4">
  //                 <h3 className="font-medium text-gray-900 mb-1">{design.name}</h3>
  //                 <p className="text-sm text-gray-500">Created on {new Date(design.dateCreated).toLocaleDateString()}</p>
                  
  //                 <div className="mt-3 flex justify-between items-center">
  //                   <div 
  //                     className="w-6 h-6 rounded-full border border-gray-300" 
  //                     style={{ backgroundColor: design.tshirtColorHex }}
  //                     title={`Color: ${design.tshirtColorHex}`}
  //                   ></div>
  //                   <Button 
  //                     variant="ghost" 
  //                     size="sm"
  //                     className="text-xs"
  //                     onClick={(e) => {
  //                       e.stopPropagation();
  //                       // Add delete functionality here
  //                       if (confirm('Are you sure you want to delete this design?')) {
  //                         setDesigns(designs.filter(d => d.id !== design.id));
  //                       }
  //                     }}
  //                   >
  //                     Delete
  //                   </Button>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </main>

  //     {/* Login Modal */}
  //     <LoginModal 
  //       isOpen={isLoginModalOpen} 
  //       onClose={() => setIsLoginModalOpen(false)} 
  //     />
  //   </div>
  // )
}