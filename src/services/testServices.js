export async function getAllCategories(){
    const categories = await fetch('/api/tests/getallcategories')
    return categories

}

export function createCategory(incomingCat){
    const category = fetch('/api/tests/createcategory')
    return category
}