import LoginBtn from "@/components/auth/LoginBtn";

async function getData() {
  const res = await fetch('http://localhost:3000/api/mock/starlist', {next: { revalidate: 0 }});
 
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}

export default async function Home() {

  const data:Array<{ header: string; id: number }> = await getData();

  return (
    <>
      <header className="h-[10rem]">
        <h1 className="font-mono text-3xl text-center">CheckListHub</h1>
        <LoginBtn />
      </header>
      <main>
        <h2 className="text-xl">Check Our Stared Lists</h2>
        {data.map((item, index)=>(<a key={index} href={`/checklist/${item.id}`} className="block h-12">{item.header}</a>))}
      </main>
    </>
  );
}
