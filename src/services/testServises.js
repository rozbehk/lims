export async function getAllTests(){
    const categories = await fetch('/api/tests/getalltests')
    return categories

}

export async function createTest(incomingCat){
    const category = await fetch('/api/tests/createtest')
    console.log(category.json())
    return category
}