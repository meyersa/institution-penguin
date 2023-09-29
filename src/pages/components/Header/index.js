import React, { useEffect, useState } from "react";
import Link from 'next/link';

import styles from './header.module.css'

export default function Header() {
  return (
      <nav>
        <ul class="header-bar">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
  );
};