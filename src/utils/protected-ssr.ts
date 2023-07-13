import { type Session } from "next-auth";
import {
  type PreviewData,
  type GetServerSideProps,
  type GetServerSidePropsResult,
  type GetServerSidePropsContext,
} from "next/types";
import { type ParsedUrlQuery } from "querystring";
import { getServerAuthSession } from "~/server/auth";

type EmptyObject = Record<string, never>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseProps = { [key: string]: any };

// type GetServerSidePropsContextWithSession<
//   TParams extends ParsedUrlQuery = ParsedUrlQuery,
//   TPreview extends PreviewData = PreviewData
// > = GetServerSidePropsContext<TParams, TPreview> & {
//   session: Session;
// };

type GetServerSidePropsWithSession<
  TProps extends BaseProps = BaseProps,
  TParams extends ParsedUrlQuery = ParsedUrlQuery,
  TPreview extends PreviewData = PreviewData
> = (
  context: GetServerSidePropsContext<TParams, TPreview>,
  session: Session
) => Promise<GetServerSidePropsResult<TProps>>;

type ProtectedSsrOptions<
  TProps extends BaseProps = BaseProps,
  TParams extends ParsedUrlQuery = ParsedUrlQuery,
  TPreview extends PreviewData = PreviewData
> = {
  getProps: GetServerSidePropsWithSession<TProps, TParams, TPreview>;
};

export function protectedSsr<
  TProps extends BaseProps = BaseProps,
  TParams extends ParsedUrlQuery = ParsedUrlQuery,
  TPreview extends PreviewData = PreviewData
>(
  options: ProtectedSsrOptions<TProps, TParams, TPreview>
): GetServerSideProps<TProps, TParams, TPreview>;

export function protectedSsr<
  TProps extends BaseProps = BaseProps,
  TParams extends ParsedUrlQuery = ParsedUrlQuery,
  TPreview extends PreviewData = PreviewData
>(): GetServerSideProps<TProps, TParams, TPreview>;

export function protectedSsr<
  TProps extends BaseProps = BaseProps,
  TParams extends ParsedUrlQuery = ParsedUrlQuery,
  TPreview extends PreviewData = PreviewData
>(
  options?: ProtectedSsrOptions<TProps, TParams, TPreview>
): GetServerSideProps<TProps | EmptyObject, TParams, TPreview> {
  return async function producedGetProtectedServerSideProps(context) {
    const session = await getServerAuthSession(context);

    if (session === null) {
      return { notFound: true };
    }

    if (options !== undefined && "getProps" in options) {
      const otherProps = await options.getProps(context, session);

      if ("props" in otherProps) {
        const props = otherProps.props;

        if (props instanceof Promise) {
          return props.then((resolvedProps) => ({
            props: { ...resolvedProps },
          }));
        } else {
          return {
            props: { ...props },
          };
        }
      }
      return otherProps;
    }

    return { props: {} };
  };
}
