import * as React from "react"
import CaptionLabel from "./CaptionLabel"
import {kebabCase} from "lodash"
import styles from "./CategoryList.module.scss"
import { Link } from "gatsby";

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
                <Link key={cat} to={`/blog/categories/${kebabCase(cat)}`}>
                    <CaptionLabel>
                        {cat}
                    </CaptionLabel>
                </Link>
            ))}
        </div>
    )
}

export default CategoryList