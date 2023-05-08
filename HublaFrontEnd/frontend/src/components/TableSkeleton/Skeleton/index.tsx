import { Skeleton as SkeletonMui, SkeletonProps } from "@mui/material";

type ISkeleton = SkeletonProps;

const Skeleton = (props: ISkeleton) => {
  const { animation = "wave", width = "100%", ...rest } = props;
  return <SkeletonMui animation={animation} width={width} {...rest} />;
};

export default Skeleton;
