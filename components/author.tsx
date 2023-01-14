import Image from "next/image";

interface IAuthorProps {
  data: Author;
}

const Author: React.FC<IAuthorProps> = ({ data }) => (
  <div>
    <span>{data.name}</span>
    <span>{data.bio}</span>
    <span>{data.profilePicture.title}</span>

    <Image
      src={data.profilePicture.url}
      width={data.profilePicture.width}
      height={data.profilePicture.height}
      alt={data.profilePicture.title}
    />
  </div>
);

export default Author;
