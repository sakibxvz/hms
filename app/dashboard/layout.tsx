import React from 'react'
import { AppSidebar } from '@/components/Global/dashboard/app-sidebar';
import { ModeToggle } from '@/components/Global/dashboard/mode-toggle';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';

type Props = {
    children: React.ReactNode
}


const DashboardLayout = ({ children }: Props) => {
  return (
      <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
              <header className='flex h-16 items-center px-4 justify-between'>
                  {/* Left-side items */}
                  <div className='flex items-center gap-2'>
                      <SidebarTrigger className='-ml-1' />
                      <Separator orientation='vertical' className='mr-2 h-4' />

                      <Breadcrumb>
                          <BreadcrumbList>
                              <BreadcrumbItem className='hidden md:block'>
                                  <BreadcrumbLink href='#'>
                                      Building Your Application
                                  </BreadcrumbLink>
                              </BreadcrumbItem>
                              <BreadcrumbSeparator className='hidden md:block' />
                              <BreadcrumbItem>
                                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                              </BreadcrumbItem>
                          </BreadcrumbList>
                      </Breadcrumb>
                  </div>

                  {/* ModeToggle on the far right */}
                  <ModeToggle />
              </header>
              
              {/* main content  */}

              {children}
          </SidebarInset>
      </SidebarProvider>
  )
}

export default DashboardLayout