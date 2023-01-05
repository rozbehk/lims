export async function getAllCategories(){
    const categories = await fetch('/api/categories/getallcategories')
    return categories

}

export function createCategory(incomingCat){
    const category = fetch('/api/categories/createcategory')
    return category
}