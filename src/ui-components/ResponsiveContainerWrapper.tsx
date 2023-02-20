import { FC, memo } from "react";
import { ResponsiveContainer, ResponsiveContainerProps } from "recharts";

export const ResponsiveContainerWrapper: FC<ResponsiveContainerProps> = ({
  children,
  ...props
}) => <ResponsiveContainer {...props}>{children}</ResponsiveContainer>;

export default memo(ResponsiveContainerWrapper);
