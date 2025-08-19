import { useState } from "react";
import Navbar from "./navbar2";
import BookCover from "../images/robot.png";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    avatar: "/profile.png", // fallback profile image
  });

  return (
    <>
    <Navbar/>
    <div
      className="hero min-h-60"
    style={{
        // import the bookcover image form the images
        backgroundImage: `url(${BookCover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
    </div>
        <div>
            <div className="avatar border ml-20 relative bottom-15">
  <div className="ring-primary ring-offset-base-100 w-50 border rounded-full ring-2 ring-offset-2">
    <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
  </div>
</div>
        </div>
    </>
    
  );
}

export default UserProfile;