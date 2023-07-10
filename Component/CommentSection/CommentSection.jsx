import React, { useState } from "react";
import { Card } from "react-bootstrap";
import noPlayer from "../../public/Images/no-player.png";
import styles from "./CommentSection.module.scss";
import Share from "../../public/Images/shareliveblog.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsThreeDotsVertical } from "react-icons/bs";
const CommentSection = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="CommentsSection_Card_section">
      {" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card className="CommentsSection_Card">
        <Card.Body>
          <div className="CommentsSection_Card1">
            <div className="imagesComment">
              <img src={noPlayer} width="40px" height="40px" />
            </div>
            <div className="CommentsSection_userName">
              <h5>Hitesh Sharma</h5>
              <h6>10-2-2023</h6>
            </div>
          </div>
          <div className="CommentsSection_Card2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="CommentsSection_Card3">
            <img src={Share} width="13px" height="13px" />
            <h6
              // id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="threedot" />
            </h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CommentSection;
