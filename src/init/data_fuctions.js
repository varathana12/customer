
export const remove_element = (collection,value)=>{
    var data = []
    var status = true
    for(var key in collection){
        for(var i in collection[key]){
            if(collection[key][i].id === Number(value)){
                status = false
                break
            }
        }
        if(status)
            data.push({[key]:collection[key]})
        status = true
    }
    return data
}

export const id_to_location = (collection,value)=>{
    for(var key in collection){
        for(var i in collection[key]){
            if(collection[key][i].id === Number(value)){
               return key
            }
        }

    }
}

export const id_to_pickup = (collection,value)=> {
    for (var key in collection) {
        for (var i in collection[key]) {
            if (collection[key][i].id === Number(value)) {
                return collection[key][i].name
            }
        }
    }
}
export const same_parent = (collection,value1,value2)=>
{
    let parent1 ="";
    let parent2 = ""

    for(var key in collection){
        for(var i in collection[key]){
            if(collection[key][i].id === Number(value1)){
                parent1 = key
            }
            if(collection[key][i].id === Number(value2)){
                parent2 = key
            }
            if(parent1 && parent2) break
        }
        if(parent1 && parent2) break
    }

    return parent1 === parent2
}