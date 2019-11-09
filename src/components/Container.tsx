import * as React from "react"
import classNames from "classnames";
import "./Container.scss"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    contstrain?: boolean;
}

const Container: React.SFC<ContainerProps> = ({ className = "", children, contstrain=false, ...restProps }) => (
    <div {...restProps} className={classNames("container",{"constrained":contstrain}, className)}>
        {children}
    </div>
);

export default Container;
