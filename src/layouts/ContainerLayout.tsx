import * as React from "react"
import Layout, { LayoutProps } from "./index";

export interface ContainerLayoutProps extends LayoutProps {

}


const ContainerLayout: React.SFC<ContainerLayoutProps> = ({ children, ...restProps }) => (
    <Layout {...restProps}>
        <div className="container">
            {children}
        </div>
    </Layout>
)

export default ContainerLayout;