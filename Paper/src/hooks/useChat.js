export default function (names,ids) {
    let name= names.sort().map((e)=>{
        return e.toUpperCase().slice(0,2) +e.length+e.charCodeAt(e.length/2)+ e.toUpperCase().slice((e.length-2),e.length)
      }).join("")+ids[0]+ids[1]
      return name
}

  