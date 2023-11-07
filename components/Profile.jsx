import Loading from "./Loading";
import PromptCard from "./PromptCard";

// interface Post {
//   _id: string;
// }

// interface IProfileProps {
//   name: string;
//   desc: string;
//   handleEdit: (tag: object) => void;
//   handleDelete: (tag: object) => void;
//   data: Post[];
//   loading: boolean;
// }

const Profile = ({ name, desc, data, handleEdit, handleDelete, loading }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      {loading ? (
        <Loading />
      ) : (
        <div className="mt-10 prompt_layout">
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Profile;
