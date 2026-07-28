"use client";

import { Box, Flex } from "@/components/primitives";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import type { ReactNode } from "react";
import styles from "./AppShell.module.scss";

export interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <Header />
      <Flex className={styles.body}>
        <Sidebar />
        <Box as="main" className={styles.main}>
          {children}
        </Box>
      </Flex>
    </div>
  );
}
