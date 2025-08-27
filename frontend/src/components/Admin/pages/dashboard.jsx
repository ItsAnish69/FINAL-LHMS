import { ArrowRightLeft, BookCopyIcon, BookIcon, BookOpen, CircleAlert, Sidebar } from 'lucide-react';
import { UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useFetcher } from 'react-router-dom';

const Dashboard = () => {
 
   const [users, setUsers] = useState([]);
   const [books, setBooks] = useState([]);
   const [borrowers, setBorrowers] = useState([]);

  // const [bookBorroweredCount, setOverdueBooksCount] = useState(null);
  const [loading, setLoading] = useState(true)


  //user data fetch
  useEffect(() =>{
    fetch('http://localhost:5000/api/user')
    .then((res)=> res.json())
    .then((data) => {
      setUsers(data)
      setLoading(false)
    })
  }, [])

  //book data fetch
  useEffect(() =>{
    fetch('http://localhost:5000/api/book')
    .then((res)=> res.json())
    .then((data) => {
      setBooks(data)
      setLoading(false)
    })
  }, [])

  //books borrowed data fetch
  useEffect(() =>{
    fetch('http://localhost:5000/api/borrow/')
    .then((res)=> res.json())
    .then((data) => {
      setBorrowers(data)
      setLoading(false)
    })
  }, [])

  //overdue books data fetch
  // useEffect(() =>{
  //   fetch('http://localhost:5000/api/book/')
  //   .then((res)=> res.json())
  //   .then((data) => {
  //     bookBorroweredCount(data)
  //     setLoading(false)
  //   })
  // }, [])

//after the fetching
const totalUser = users.length;
const totalBook = books.length;
const totalBorrower = borrowers.length;

 const SidebarItems = [
   {id:2, title: "Total Books", value: totalBook, icon: BookOpen, bg: "bg-green-400"},
    {id:1, title: "Total Users", value: totalUser, icon: UserIcon, bg: "bg-blue-400"},
    {id:3, title: "Total Borrowers", value: totalBorrower, icon: ArrowRightLeft, bg: "bg-yellow-400"},
    // {id:4, title: "Total Books Borrowered", icon: CircleAlert, bg: "bg-red-400"}
  ]


  return (
    <>
    {/* apply the sidebaritems below */}
      {SidebarItems.map(item => (
        <div key={item.id} className={` border border-gray-200 shadow-md w-full rounded-lg overflow-hidden mx-auto mt-4 transition-transform duration-200 hover:scale-101`}>
          <div className="p-6 flex justify-between px-10 items-center">
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-3xl font-bold leading-relaxed">{item.value}</p>
            </div>
            <div className={`p-3 rounded-xl ${item.bg}`}>
              {item.icon && <item.icon className="w-6 h-6 text-white" />}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Dashboard;

