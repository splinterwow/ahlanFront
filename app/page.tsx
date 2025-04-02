// "use client"

// import React, { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { MainNav } from "@/components/main-nav"
// import { Search } from "@/components/search"
// import { UserNav } from "@/components/user-nav"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { CalendarDateRangePicker } from "@/components/date-range-picker"
// import { Overview } from "@/components/overview"
// import { RecentSales } from "@/components/recent-sales"
// import { Building, Home, Users, CreditCard, DollarSign, TrendingUp, BarChart } from "lucide-react"
// import { toast } from "@/hooks/use-toast"

// export default function DashboardPage() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(true)
//   const [stats, setStats] = useState({
//     totalProperties: 0,
//     totalApartments: 0,
//     soldApartments: 0,
//     reservedApartments: 0,
//     availableApartments: 0,
//     totalClients: 0,
//     totalSales: 0,
//     totalPayments: 0,
//     pendingPayments: 0,
//     overduePayments: 0,
//   })
//   const [objects, setObjects] = useState([])
//   const [loadingObjects, setLoadingObjects] = useState(true)

//   // Tokenni olish va tekshirish
//   const accessToken = localStorage.getItem("access_token")

//   // API so‘rovlar uchun umumiy header
//   const getAuthHeaders = () => ({
//     "Accept": "application/json",
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${accessToken}`,
//   })

//   // Statistika ma'lumotlarini olish
//   useEffect(() => {
//     if (!accessToken) {
//       toast({
//         title: "Xatolik",
//         description: "Tizimga kirish talab qilinadi",
//         variant: "destructive",
//       })
//       router.push("/login")
//       return
//     }

//     const fetchStats = async () => {
//       try {
//         const response = await fetch("https://ahlanhouse.pythonanywhere.com/stats/", {
//           method: "GET",
//           headers: getAuthHeaders(),
//         })

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error("Sessiya tugagan, qayta kirish kerak")
//           }
//           throw new Error("Statistikani olishda xatolik")
//         }

//         const data = await response.json()
//         setStats({
//           totalProperties: data.total_properties || 0,
//           totalApartments: data.total_apartments || 0,
//           soldApartments: data.sold_apartments || 0,
//           reservedApartments: data.reserved_apartments || 0,
//           availableApartments: data.available_apartments || 0,
//           totalClients: data.total_clients || 0,
//           totalSales: data.total_sales || 0,
//           totalPayments: data.total_payments || 0,
//           pendingPayments: data.pending_payments || 0,
//           overduePayments: data.overdue_payments || 0,
//         })
//         setLoading(false)
//       } catch (error) {
//         toast({
//           title: "Xatolik",
//           description: error.message || "Statistikani olishda xatolik yuz berdi",
//           variant: "destructive",
//         })
//         setLoading(false)
//       }
//     }

//     fetchStats()
//   }, [accessToken, router])

//   // Obyektlar ro‘yxatini olish
//   useEffect(() => {
//     if (!accessToken) {
//       router.push("/login")
//       return
//     }

//     const fetchObjects = async () => {
//       setLoadingObjects(true)
//       try {
//         const response = await fetch("https://ahlanhouse.pythonanywhere.com/objects/", {
//           method: "GET",
//           headers: getAuthHeaders(),
//         })

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error("Sessiya tugagan, qayta kirish kerak")
//           }
//           throw new Error("Obyektlarni olishda xatolik")
//         }

//         const data = await response.json()
//         const objectsList = data.results || data || []
//         setObjects(objectsList)
//         setLoadingObjects(false)
//       } catch (error) {
//         toast({
//           title: "Xatolik",
//           description: error.message || "Obyektlarni olishda xatolik yuz berdi",
//           variant: "destructive",
//         })
//         // Test ma'lumotlari bilan fallback
//         setObjects([
//           { id: 1, name: "Ahlan Residence", address: "Toshkent", description: "Test", total_apartments: 48, floors: 12 },
//           { id: 2, name: "Ahlan Tower", address: "Toshkent", description: "Test", total_apartments: 36, floors: 9 },
//         ])
//         setLoadingObjects(false)
//       }
//     }

//     fetchObjects()
//   }, [accessToken, router])

//   if (loading || loadingObjects) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
//           <p>Yuklanmoqda...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="flex min-h-screen flex-col">
//       <div className="border-b">
//         <div className="flex h-16 items-center px-4">
//           <MainNav className="mx-6" />
//           <div className="ml-auto flex items-center space-x-4">
//             <Search />
//             <UserNav />
//           </div>
//         </div>
//       </div>
//       <div className="flex-1 space-y-4 p-8 pt-6">
//         <div className="flex items-center justify-between space-y-2">
//           <h2 className="text-3xl font-bold tracking-tight">Boshqaruv paneli</h2>
//           <div className="flex items-center space-x-2">
//             <CalendarDateRangePicker />
//             <Button>
//               <BarChart className="mr-2 h-4 w-4" />
//               Hisobotlar
//             </Button>
//           </div>
//         </div>

//         <Tabs defaultValue="overview" className="space-y-4">
//           <TabsList>
//             <TabsTrigger value="overview">Umumiy ko'rinish</TabsTrigger>
//             <TabsTrigger value="properties">Obyektlar</TabsTrigger>
//             <TabsTrigger value="sales">Sotuvlar</TabsTrigger>
//             <TabsTrigger value="payments">To'lovlar</TabsTrigger>
//           </TabsList>

//           <TabsContent value="overview" className="space-y-4">
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Jami sotuvlar</CardTitle>
//                   <DollarSign className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</div>
//                   <p className="text-xs text-muted-foreground">+20.1% o'tgan oyga nisbatan</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Sotilgan xonadonlar</CardTitle>
//                   <Home className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.soldApartments}</div>
//                   <p className="text-xs text-muted-foreground">
//                     {Math.round((stats.soldApartments / stats.totalApartments) * 100)}% jami xonadonlardan
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Mijozlar</CardTitle>
//                   <Users className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.totalClients}</div>
//                   <p className="text-xs text-muted-foreground">+12% o'tgan oyga nisbatan</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Muddati o'tgan to'lovlar</CardTitle>
//                   <CreditCard className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-red-600">${stats.overduePayments.toLocaleString()}</div>
//                   <p className="text-xs text-muted-foreground">
//                     {Math.round((stats.overduePayments / stats.totalSales) * 100)}% jami sotuvlardan
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//               <Card className="col-span-4">
//                 <CardHeader>
//                   <CardTitle>Sotuvlar dinamikasi</CardTitle>
//                 </CardHeader>
//                 <CardContent className="pl-2">
//                   <Overview />
//                 </CardContent>
//               </Card>
//               <Card className="col-span-3">
//                 <CardHeader>
//                   <CardTitle>So'nggi sotuvlar</CardTitle>
//                   <CardDescription>Oxirgi 5 ta sotuv</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <RecentSales />
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="properties" className="space-y-4">
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Jami obyektlar</CardTitle>
//                   <Building className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.totalProperties}</div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Jami xonadonlar</CardTitle>
//                   <Home className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.totalApartments}</div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Bo'sh xonadonlar</CardTitle>
//                   <Home className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.availableApartments}</div>
//                   <p className="text-xs text-muted-foreground">
//                     {Math.round((stats.availableApartments / stats.totalApartments) * 100)}% jami xonadonlardan
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Obyektlar</CardTitle>
//                 <CardDescription>Barcha obyektlar ro'yxati</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                   {objects.map((object) => (
//                     <Card key={object.id}>
//                       <CardHeader>
//                         <CardTitle>{object.name}</CardTitle>
//                         <CardDescription>{object.address}</CardDescription>
//                       </CardHeader>
//                       <CardContent>
//                         <p>{object.description}</p>
//                         <p>Jami xonadonlar: {object.total_apartments}</p>
//                         <p>Qavatlar soni: {object.floors}</p>
//                       </CardContent>
//                       <div className="p-4 pt-0">
//                         <Button
//                           className="w-full"
//                           variant="outline"
//                           onClick={() => router.push(`/properties/${object.id}`)}
//                         >
//                           Batafsil
//                         </Button>
//                       </div>
//                     </Card>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="sales" className="space-y-4">
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Jami sotuvlar</CardTitle>
//                   <DollarSign className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Sotilgan xonadonlar</CardTitle>
//                   <Home className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.soldApartments}</div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Band qilingan xonadonlar</CardTitle>
//                   <Home className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.reservedApartments}</div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">O'rtacha narx</CardTitle>
//                   <TrendingUp className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">
//                     ${stats.soldApartments ? Math.round(stats.totalSales / stats.soldApartments).toLocaleString() : 0}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="payments" className="space-y-4">
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Jami to'lovlar</CardTitle>
//                   <CreditCard className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">${stats.totalPayments.toLocaleString()}</div>
//                   <p className="text-xs text-muted-foreground">
//                     {Math.round((stats.totalPayments / stats.totalSales) * 100)}% jami sotuvlardan
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Kutilayotgan to'lovlar</CardTitle>
//                   <CreditCard className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-yellow-600">${stats.pendingPayments.toLocaleString()}</div>
//                   <p className="text-xs text-muted-foreground">
//                     {Math.round((stats.pendingPayments / stats.totalSales) * 100)}% jami sotuvlardan
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Muddati o'tgan to'lovlar</CardTitle>
//                   <CreditCard className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-red-600">${stats.overduePayments.toLocaleString()}</div>
//                   <p className="text-xs text-muted-foreground">
//                     {Math.round((stats.overduePayments / stats.totalSales) * 100)}% jami sotuvlardan
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">To'lov qilinishi kerak</CardTitle>
//                   <CreditCard className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-red-600">
//                     ${(stats.totalSales - stats.totalPayments).toLocaleString()}
//                   </div>
//                   <p className="text-xs text-muted-foreground">
//                     {Math.round(((stats.totalSales - stats.totalPayments) / stats.totalSales) * 100)}% jami sotuvlardan
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }



"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { Search } from "@/components/search";
import { UserNav } from "@/components/user-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { Building, Home, Users, CreditCard, DollarSign, TrendingUp, BarChart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null); // accessToken holat sifatida
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalApartments: 0,
    soldApartments: 0,
    reservedApartments: 0,
    availableApartments: 0,
    totalClients: 0,
    totalSales: 0,
    totalPayments: 0,
    pendingPayments: 0,
    overduePayments: 0,
  });
  const [objects, setObjects] = useState([]);
  const [loadingObjects, setLoadingObjects] = useState(true);

  // accessToken ni faqat mijoz tarafida olish
  useEffect(() => {
    if (typeof window !== "undefined") { // Brauzer muhitida ekanligini tekshirish
      const token = localStorage.getItem("access_token");
      setAccessToken(token);
    }
  }, []);

  // API so‘rovlar uchun umumiy header
  const getAuthHeaders = () => ({
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`,
  });

  // Statistika ma'lumotlarini olish
  useEffect(() => {
    if (accessToken === null) return; // Token hali yuklanmagan bo‘lsa kutamiz

    if (!accessToken) {
      toast({
        title: "Xatolik",
        description: "Tizimga kirish talab qilinadi",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await fetch("https://ahlanhouse.pythonanywhere.com/stats/", {
          method: "GET",
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Sessiya tugagan, qayta kirish kerak");
          }
          throw new Error("Statistikani olishda xatolik");
        }

        const data = await response.json();
        setStats({
          totalProperties: data.total_properties || 0,
          totalApartments: data.total_apartments || 0,
          soldApartments: data.sold_apartments || 0,
          reservedApartments: data.reserved_apartments || 0,
          availableApartments: data.available_apartments || 0,
          totalClients: data.total_clients || 0,
          totalSales: data.total_sales || 0,
          totalPayments: data.total_payments || 0,
          pendingPayments: data.pending_payments || 0,
          overduePayments: data.overdue_payments || 0,
        });
        setLoading(false);
      } catch (error) {
        toast({
          title: "Xatolik",
          description: error.message || "Statistikani olishda xatolik yuz berdi",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchStats();
  }, [accessToken, router]);

  // Obyektlar ro‘yxatini olish
  useEffect(() => {
    if (accessToken === null) return; // Token hali yuklanmagan bo‘lsa kutamiz

    if (!accessToken) {
      router.push("/login");
      return;
    }

    const fetchObjects = async () => {
      setLoadingObjects(true);
      try {
        const response = await fetch("https://ahlanhouse.pythonanywhere.com/objects/", {
          method: "GET",
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Sessiya tugagan, qayta kirish kerak");
          }
          throw new Error("Obyektlarni olishda xatolik");
        }

        const data = await response.json();
        const objectsList = data.results || data || [];
        setObjects(objectsList);
        setLoadingObjects(false);
      } catch (error) {
        toast({
          title: "Xatolik",
          description: error.message || "Obyektlarni olishda xatolik yuz berdi",
          variant: "destructive",
        });
        // Test ma'lumotlari bilan fallback
        setObjects([
          { id: 1, name: "Ahlan Residence", address: "Toshkent", description: "Test", total_apartments: 48, floors: 12 },
          { id: 2, name: "Ahlan Tower", address: "Toshkent", description: "Test", total_apartments: 36, floors: 9 },
        ]);
        setLoadingObjects(false);
      }
    };

    fetchObjects();
  }, [accessToken, router]);

  if (loading || loadingObjects) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Boshqaruv paneli</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>
              <BarChart className="mr-2 h-4 w-4" />
              Hisobotlar
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Umumiy ko'rinish</TabsTrigger>
            <TabsTrigger value="properties">Obyektlar</TabsTrigger>
            <TabsTrigger value="sales">Sotuvlar</TabsTrigger>
            <TabsTrigger value="payments">To'lovlar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Jami sotuvlar</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+20.1% o'tgan oyga nisbatan</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sotilgan xonadonlar</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.soldApartments}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((stats.soldApartments / stats.totalApartments) * 100)}% jami xonadonlardan
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Mijozlar</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalClients}</div>
                  <p className="text-xs text-muted-foreground">+12% o'tgan oyga nisbatan</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Muddati o'tgan to'lovlar</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">${stats.overduePayments.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((stats.overduePayments / stats.totalSales) * 100)}% jami sotuvlardan
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Sotuvlar dinamikasi</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>So'nggi sotuvlar</CardTitle>
                  <CardDescription>Oxirgi 5 ta sotuv</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="properties" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Jami obyektlar</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProperties}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Jami xonadonlar</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalApartments}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bo'sh xonadonlar</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.availableApartments}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((stats.availableApartments / stats.totalApartments) * 100)}% jami xonadonlardan
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Obyektlar</CardTitle>
                <CardDescription>Barcha obyektlar ro'yxati</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {objects.map((object) => (
                    <Card key={object.id}>
                      <CardHeader>
                        <CardTitle>{object.name}</CardTitle>
                        <CardDescription>{object.address}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{object.description}</p>
                        <p>Jami xonadonlar: {object.total_apartments}</p>
                        <p>Qavatlar soni: {object.floors}</p>
                      </CardContent>
                      <div className="p-4 pt-0">
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => router.push(`/properties/${object.id}`)}
                        >
                          Batafsil
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Jami sotuvlar</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sotilgan xonadonlar</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.soldApartments}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Band qilingan xonadonlar</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.reservedApartments}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">O'rtacha narx</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${stats.soldApartments ? Math.round(stats.totalSales / stats.soldApartments).toLocaleString() : 0}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Jami to'lovlar</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalPayments.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((stats.totalPayments / stats.totalSales) * 100)}% jami sotuvlardan
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Kutilayotgan to'lovlar</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">${stats.pendingPayments.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((stats.pendingPayments / stats.totalSales) * 100)}% jami sotuvlardan
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Muddati o'tgan to'lovlar</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">${stats.overduePayments.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((stats.overduePayments / stats.totalSales) * 100)}% jami sotuvlardan
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">To'lov qilinishi kerak</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    ${(stats.totalSales - stats.totalPayments).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(((stats.totalSales - stats.totalPayments) / stats.totalSales) * 100)}% jami sotuvlardan
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}