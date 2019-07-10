import * as React from "react"
import classNames from "classnames";
import "./Container.scss"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {

}

const Container: React.SFC<ContainerProps> = ({ className = "",children, ...restProps }) => (
    <div {...restProps} className={classNames("container",className)}>
        {children}
    </div>
);

export default Container;
