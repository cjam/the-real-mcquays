import * as React from "react"
import CaptionLabel from "./CaptionLabel"
import styles from "./CategoryList.module.scss"

interface CategoryListProps extends React.HTMLAttributes<HTMLDivElement> {
    categories?: string[]
}

const CategoryList: React.SFC<CategoryListProps> = ({
    categories,
    ...restProps
}) => {
    return (
        <div className={styles.categoryList} >
            {categories && categories.map(cat => (
                <CaptionLabel key={cat}>
                    {cat}
                </CaptionLabel>
            ))}
        </div>
    )
}

export default CategoryList