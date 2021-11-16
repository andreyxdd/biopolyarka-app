import React, { useEffect, useState } from "react";

interface Props {
  children: any;
  style?: React.CSSProperties;
}

const ClientOnlyDiv: React.FC<Props> = ({ children, style, ...delegated }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div style={style} {...delegated}>
      {children}
    </div>
  );
};
export default ClientOnlyDiv;
