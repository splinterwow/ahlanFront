// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { useAuth } from "../contexts/AuthContext"
// import { Button } from "../components/ui/button"
// import { Input } from "../components/ui/input"
// import { Label } from "../components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
// import { toast } from "../components/ui/use-toast"

// const LoginPage = () => {
//   const navigate = useNavigate()
//   const { login } = useAuth()
//   const [loading, setLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       navigate("/"); // Token mavjud bo'lsa, bosh sahifaga yo'naltirish
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       await login(formData.email, formData.password)
//       navigate("/")
//     } catch (error) {
//       toast({
//         title: "Xatolik",
//         description: error.message || "Login yoki parol noto'g'ri",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const setDemoCredentials = (role) => {
//     if (role === "admin") {
//       setFormData({
//         email: "admin@ahlanhouse.uz",
//         password: "admin123",
//       })
//     } else if (role === "sales") {
//       setFormData({
//         email: "sales@ahlanhouse.uz",
//         password: "sales123",
//       })
//     } else if (role === "accountant") {
//       setFormData({
//         email: "accountant@ahlanhouse.uz",
//         password: "account123",
//       })
//     }
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1">
//           <div className="flex justify-center mb-4">
//             <img src="/placeholder.svg?height=60&width=200&text=Ahlan+House" alt="Ahlan House" className="h-12" />
//           </div>
//           <CardTitle className="text-2xl text-center">Tizimga kirish</CardTitle>
//           <CardDescription className="text-center">
//             Ahlan House boshqaruv tizimiga kirish uchun ma'lumotlaringizni kiriting
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="email@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="password">Parol</Label>
//                   <Button variant="link" className="p-0 h-auto text-sm" type="button">
//                     Parolni unutdingizmi?
//                   </Button>
//                 </div>
//                 <Input
//                   id="password"
//                   name="password"
//                   type="password"
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? "Kirish..." : "Kirish"}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//         <CardFooter className="flex flex-col">
//           <div className="text-sm text-muted-foreground mb-4">
//             Demo kirish uchun quyidagi ma'lumotlardan foydalaning:
//           </div>
//           <Tabs defaultValue="admin" className="w-full">
//             <TabsList className="grid grid-cols-3 w-full">
//               <TabsTrigger value="admin">Admin</TabsTrigger>
//               <TabsTrigger value="sales">Sotuv</TabsTrigger>
//               <TabsTrigger value="accountant">Buxgalter</TabsTrigger>
//             </TabsList>
//             <TabsContent value="admin" className="space-y-2 mt-2">
//               <div className="text-sm">
//                 <div>
//                   <strong>Email:</strong> admin@ahlanhouse.uz
//                 </div>
//                 <div>
//                   <strong>Parol:</strong> admin123
//                 </div>
//               </div>
//               <Button variant="outline" size="sm" className="w-full" onClick={() => setDemoCredentials("admin")}>
//                 Admin sifatida kirish
//               </Button>
//             </TabsContent>
//             <TabsContent value="sales" className="space-y-2 mt-2">
//               <div className="text-sm">
//                 <div>
//                   <strong>Email:</strong> sales@ahlanhouse.uz
//                 </div>
//                 <div>
//                   <strong>Parol:</strong> sales123
//                 </div>
//               </div>
//               <Button variant="outline" size="sm" className="w-full" onClick={() => setDemoCredentials("sales")}>
//                 Sotuv bo'limi sifatida kirish
//               </Button>
//             </TabsContent>
//             <TabsContent value="accountant" className="space-y-2 mt-2">
//               <div className="text-sm">
//                 <div>
//                   <strong>Email:</strong> accountant@ahlanhouse.uz
//                 </div>
//                 <div>
//                   <strong>Parol:</strong> account123
//                 </div>
//               </div>
//               <Button variant="outline" size="sm" className="w-full" onClick={() => setDemoCredentials("accountant")}>
//                 Buxgalter sifatida kirish
//               </Button>
//             </TabsContent>
//           </Tabs>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

// export default LoginPage