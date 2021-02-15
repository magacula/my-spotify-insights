import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HiPlay } from "react-icons/hi";

const PlayButton = styled(HiPlay)`
  fill: grey;
  color: white;
  font-size: 3rem;
  margin: 1rem 0;
  width: 30px;
  height: 30px;
`;



const UserProfile = () => {
  // example to display userInfo using useState & fetch call
    const [userInfo, setUserInfo] = useState([]);
    const [isShown, setIsShown] = useState(false);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    fetch("/user/my_profile", {
        credentials: "include",
        //credentials: 'include',
        //referrerPolicy: 'no-referrer-when-downgrade
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.user);
          setUserInfo(data.user);
        })
        .catch((error) => console.log(error))
    }, 
    []);


  return (
               
    <>
      <div style={{ marginLeft: "150px"}}>
        {userInfo.map((item, index) => {
          return (
            <div key={index}>
              <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 18px",
                borderBottom:"3px solid grey", 
                paddingBottom:"30px"
              }}>
                <div>
                  <img style={{width:"220px", 
                              height:"220px", 
                              aspectRatio:"1.0" ,
                              borderRadius:"150px", 
                              border:"3px solid #f742df"}} 
                        src={item.images[0].url} alt="profile_pic"
                        
                        />
                </div>
                <div>

                  <h4 style={{fontSize:"xx-large"}}>
                  {item.display_name}'s Profile
                  </h4>
                  <div style={{ display:"list",
                                fontSize:"x-large",
                                justifyContent:"space-between",
                                width:"108%"}}>
                    <h5>
                      ID: {item.id}
                    </h5>
                    <h5>
                      Followers: {item.followers.total} 
                    </h5>
                    <h5>
                      Email: {item.email}
                    </h5>
                    <h5>
                      Subscription: {item.product}
                    </h5>
                    <h5>
                      Country: {item.country}
                    </h5>

                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserProfile;
