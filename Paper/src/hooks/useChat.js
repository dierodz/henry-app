export default function (ids) {
  return ids.sort().map((e)=>{
    return e.toString() + e.toString().charCodeAt(e.length/2)
  }).join(ids[0]*ids[1])
}

  