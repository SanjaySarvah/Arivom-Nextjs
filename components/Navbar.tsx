import Link from 'next/link'

export default function Navbar(){
  return (
    <nav className="bg-white shadow">
      <div className="container flex items-center justify-between py-4">
        <Link href="/"><span className="text-xl font-bold cursor-pointer">My Blog</span></Link>
        <div className="flex gap-4">
          <Link href="/"><span className="cursor-pointer">Home</span></Link>
          <Link href="/news"><span className="cursor-pointer">News</span></Link>
          <Link href="/articles"><span className="cursor-pointer">Articles</span></Link>
        </div>
      </div>
    </nav>
  )
}
