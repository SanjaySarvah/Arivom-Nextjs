export default function DetailView({ data }: { data: any }) {
  return (
    <article className="card max-w-3xl mx-auto">
      <div className="h-64 w-full bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-sm text-gray-500">Image</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-700 leading-relaxed">{data.content}</p>
    </article>
  )
}
