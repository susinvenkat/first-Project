export default function LazyImage({ src, alt, className = '', loading = 'lazy', decoding = 'async', ...rest }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      {...rest}
    />
  );
}