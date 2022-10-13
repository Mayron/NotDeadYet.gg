export function getServerSideProps() {
  return {
    redirect: {
      destination: process.env.NEXT_PUBLIC_DISCORD_URL,
      permanent: true,
    },
  };
}
