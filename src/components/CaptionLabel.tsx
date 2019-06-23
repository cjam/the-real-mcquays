import React from "react";
import styles from "./CaptionLabel.module.scss"

interface CaptionLabelProps extends React.HTMLAttributes<HTMLDivElement>{

}

const CaptionLabel: React.SFC<CaptionLabelProps> = (props) => {
    const {children,...restProps} = props;
    return (
      <div className={styles.captionLabel} {...restProps}>
          {children}
      </div>
  )
}

export default CaptionLabel;
