export const getMeteoByDay = (arrayList) => {

    return arrayList.reduce((acc, elt) => {
      let key = new Date(elt.dt_txt).getDate()
      if(!acc[key])
        acc[key] = []
      acc[key].push(elt)

      return acc}, []).filter(val => val)
  }



export const getOpacity = (infoCity) => {

    let cursor = Math.round(((Number.parseInt(new Date().getTime() / 1000) - infoCity.sunrise) * 100) / (infoCity.sunset - infoCity.sunrise))

    if(Math.sign(cursor) === -1 || cursor > 100)        return 0
    else if(cursor > 50)                                return parseFloat(1 - (cursor - 50) * 2 / 100).toFixed(2)
    else                                                return parseFloat(1 - (50 - cursor) * 2 / 100).toFixed(2)
}



export const getDays = () => {
  
  const listDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  let index = new Date().getDay()
  let days = []

  while(days.length < 5){
    days.push(listDays[index])
    index = index++ >= 6 ?  0 : index++
  }

  return days
}