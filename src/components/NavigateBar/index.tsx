"use client";
import { CSSProperties, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import logo from "@/assets/logo.png";

import styles from "./index.module.scss";
import Image from "next/image";

const navigateList = [
    {
        name: "Home",
        displayName: "首頁",
        href: "/",
        icon: "home",
    },
    {
        name: "Search",
        displayName: "搜尋",
        href: "/search",
        icon: "search",
    },
    {
        name: "Post",
        displayName: "發布",
        href: "/post",
        icon: "add",
    },
    {
        name: "Settings",
        displayName: "設定",
        href: "/settings",
        icon: "settings",
    },
    {
        name: "Profile",
        displayName: "個人資料",
        href: "/profile",
        icon: "account_circle",
    }
]

function checkIsCurrentPath(path: string, pathname: string): boolean {
    if (path === "/") {
        return pathname === path || pathname === "";
    }
    return pathname.startsWith(path);
}

type propsType = Readonly<{
    isMobile?: boolean
}>;

export default function NavigateBar(props: propsType): ReactNode {
    const { isMobile } = props;

    const pathname = usePathname();

    return <div className={styles.navigateBar} data-mobile={isMobile}>
        {!isMobile && <div className={styles.imageBox}>
            <Image alt="logo" src={logo.src} fill />
        </div>}
        {navigateList.map((item) => (
            <Link
                key={item.name}
                href={item.href}
                data-selected={checkIsCurrentPath(item.href, pathname)}
                data-display-name={item.displayName}
                style={{ "--text-count": item.displayName.length } as CSSProperties}
            >
                <div className="msr">{item.icon}</div>
            </Link>
        ))}
    </div>
}