import SearchBtn from "@/components/SearchBtn";
import LoginBtn from "@/components/auth/LoginBtn"
import { Divider } from "@nextui-org/react";

async function getData() {
  const res = await fetch('http://localhost:3000/api/mock/collection?id=0', { next: { revalidate: 0 } });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {

  const data: ChecklistCollection = await getData();

  return (
    <>
      <div className="container-md">
        <header className="m-2 md:h-[5rem] gap-1 justify-items-center items-center align-middle grid grid-flow-row-dense md:grid-cols-6">
          <h1 className="text-3xl">CheckListHub</h1>
          <div className="md:col-start-5"><SearchBtn /></div>
          <div className="md:col-start-6"><LoginBtn /></div>
        </header>
        <main className="m-2 h-[32rem] grid grid-flow-row-dense grid-cols-2 md:grid-cols-3 md:grid-rows-2">
          <div id="recommend" className="col-span-2 row-span-2">
            <h2 className="text-xl">❤ Check Our Best Lists</h2>
            <div className="h-[0.25rem] bg-gradient-to-r dark:from-white from-black to-transparent rounded-lg"></div>
            <ul className="grid grid-cols-2">
              {data.ckLists.map((item, index) => (<li key={index}><a href={`/checklist/${item.id}`} className="block h-12">{item.header}</a></li>))}
            </ul>
          </div>
          <div id="recent" className="h-[16rem]">
            <h2 className="text-xl">🕙 Your Recent Lists</h2>
            <div className="h-[0.25rem] bg-gradient-to-r dark:from-white from-black to-transparent rounded-lg"></div>
            <ol className="h-[14rem] overflow-auto">
              {data.ckLists.map((item, index) => (<li key={index}><a href={`/checklist/${item.id}`} className="block h-12">{item.header}</a></li>))}
            </ol>
          </div>
          <div id="teamwork" className="h-[16rem]">
            <h2 className="text-xl">📮 Your Collaboration Lists</h2>
            <div className="h-[0.25rem] bg-gradient-to-r dark:from-white from-black to-transparent rounded-lg"></div>
            <ol className="h-[14rem] overflow-auto">
              {data.ckLists.map((item, index) => (<li key={index}><a href={`/checklist/${item.id}`} className="block h-12">{item.header}</a></li>))}
            </ol>
          </div>
        </main>
        <footer>
          <a href="http://github.com/Yiipu/checklisthub" className="fixed bottom-0">Give us a ⭐ on GitHub</a>
        </footer>
      </div>
    </>
  )
}
