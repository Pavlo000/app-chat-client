type Props = {
  error: any,
};

export const ErrorMessage: React.FC<Props> = ({ error }) => {
  return (
    <p className="error notification is-danger is-light">
      {error}
    </p>
  )
}