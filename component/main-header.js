import Link from "next/link";

import logoImg from '@/assets/logo.png';

export default function MainHeader() {
  return (
    <header>
      <Link href='/'>
        <img src={logoImg.src} alt="A plate with food on it" />
        NextLevel Food
      </Link>
    </header>
  )
}