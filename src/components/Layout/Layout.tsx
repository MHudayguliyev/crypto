import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import Topnavbar from '../Topnavbar/Topnavbar';
import styles from './Layout.module.scss'

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <Topnavbar />
      <div className={styles.children}>
        {children}
      </div>
    </div>
  )
}

export default Layout
