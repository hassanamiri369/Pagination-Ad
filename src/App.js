import React , {useState, useEffect} from "react"

import axios from "axios"
import {Pagination} from "antd";
import "antd/dist/antd.css"



function App() {

  const [posts , setPosts] = useState([])
  const [total , setTotal] = useState("")
  const [page , setPage ] = useState(1)
  const [postPerPage , setPostPerPage] = useState(10)



  useEffect(()=>{
    const fetchData = async ()=> {
      const response = await axios.get("https://jsonplaceholder.typicode.com/comments/")
      setPosts(response.data)
      setTotal(response.data.length)
    }

    fetchData()
  } , [])
 


  const indexOfLastPage = page + postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage
  const currentPosts = posts.slice(indexOfFirstPage , indexOfLastPage)

  const onShowSizeChange = (current , pageSize)=>{
    setPostPerPage(pageSize)
  }


  const itemRender = (current , type , originalElement)=>{
      if(type === "prev"){
        return <a>Previous</a>
      }

      if(type === "next"){
        return <a>Next</a>
      }

      return originalElement
  }



  return (
    <>
      <div className="container">
        
          <div className="lists">
          {currentPosts.map(item => (
            <h3 key={item.id}><span>{item.id}</span> : {item.body}</h3>
          ))}
          </div>



          <div className="pagination">
          <Pagination
          onChange={(value)=> setPage(value)}
          pageSize={postPerPage}
          total={total}
          current={page}
          showSizeChanger
          showQuickJumper
          onShowSizeChange={onShowSizeChange}
          itemRender={itemRender}
          />
          </div>
      </div>
    </>
  );
}

export default App;
