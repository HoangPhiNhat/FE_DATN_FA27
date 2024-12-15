import SampleNextArrow from "@/components/UI/Control/SampleNextArrow";
import SamplePrevArrow from "@/components/UI/Control/SamplePrevArrow";

const bannerSettings = (dotActive, setDocActive) => ({
  dots: true,
  infinite: true,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  beforeChange: (prev, next) => {
    setDocActive(next);
  },
  appendDots: (dots) => (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "7%",
        transform: "translateY(-50%)",
      }}
    >
      <ul style={{ margin: "0px" }}> {dots} </ul>
    </div>
  ),
  customPaging: (i) => (
    <div
      style={
        i === dotActive
          ? {
              width: "30px",
              color: "#262626",
              borderRight: "3px #262626 solid",
              padding: "8px 0",
              cursor: "pointer",
            }
          : {
              width: "30px",
              color: "transparent",
              borderRight: "3px white solid",
              padding: "8px 0",
              cursor: "pointer",
            }
      }
    >
      0{i + 1}
    </div>
  ),
  responsive: [
    {
      breakpoint: 576,
      settings: {
        dots: true,
        appendDots: (dots) => (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "2%",
              transform: "translateY(-50%)",
            }}
          >
            <ul style={{ margin: "0px" }}> {dots} </ul>
          </div>
        ),
        customPaging: (i) => (
          <div
            style={
              i === dotActive
                ? {
                    width: "25px",
                    color: "#262626",
                    borderRight: "3px #262626 solid",
                    cursor: "pointer",
                    fontSize: "12px",
                  }
                : {
                    width: "25px",
                    color: "transparent",
                    borderRight: "3px white solid",
                    cursor: "pointer",
                    fontSize: "12px",
                  }
            }
          >
            0{i + 1}
          </div>
        ),
      },
    },
  ],
});

const productSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
};

const productImageSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
};

// dùng cho chi tiết sản phẩm

// ảnh chính
const mainSliderSettings = (handleMainSlideChange) => ({
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  infinite: true,
  beforeChange: (_, next) => handleMainSlideChange(next), // Đồng bộ thumbnail
});

// ảnh phụ
const thumbnailSliderSettings = (images, showArrows) => ({
  slidesToShow: 5,
  slidesToScroll: 1,
  infinite: false,
  centerPadding: images.length < 5 ? `${(5 - images.length) * 10}%` : "0px",
  nextArrow: showArrows ? <SampleNextArrow /> : null,
  prevArrow: showArrows ? <SamplePrevArrow /> : null,
  focusOnSelect: false, // Không tự động focus
});

export {
  bannerSettings,
  productSettings,
  productImageSettings,
  mainSliderSettings,
  thumbnailSliderSettings,
};


