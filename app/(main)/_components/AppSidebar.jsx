"use client"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { SidebarOptions } from "@/services/Constants"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {

  const path = usePathname();
  console.log(path)

  return (
    <Sidebar>
      <SidebarHeader className='flex items-center mt-5'>
        <div className='flex flex-row items-center gap-3 mb-5'>
            <Image src={'/logo.svg'} alt='logo' width={40} height={40}  />
            <p className='font-bold text-lg text-gray-600'>AI Recruter</p>
        </div>
        <Button className='w-full mt-5'> <Plus/> Create new interview </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarContent>
                <SidebarMenu>
                    {SidebarOptions.map((option, index) =>(
                        <SidebarMenuItem key={index} className='p-1'>
                            <SidebarMenuButton asChild className={`p-5 ${path === option.path && 'bg-amber-50'}`}>
                                <Link href={option.path} >
                                    <option.icon className={`${path === option.path && 'text-amber-500'}`} />
                                    <span className={`text-[16px] font-medium ${path === option.path && 'text-amber-500'}`}>{option.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}