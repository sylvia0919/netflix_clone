import React, { useMemo, useState } from "react";
import { Card, Container } from "react-bootstrap";
import "./ReviewBox.style.css";

const ReviewBox = ({ author, content }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  // const textLimit = useRef(170);
  // console.log('dddddddddddd'+Object.values(content).length);

  const shortContent = useMemo(() => {
    const shortReview = content.slice(0, 170); // 원본에서 글자 수만큼 잘라서 짧은 버전을 준비하자
    if (content && content.length > 170) {
      // 원본이 길면 (원본 글자수 > 제한된 갯수)
      if (isShowMore) {
        return content;
      } // 더보기가 true 면 원본 바로 리턴
      return shortReview; // (더보기가 false면) 짧은 버전 리턴해주자
    }
    return content; // 그렇지않으면 (짧은 글에는) 쓴글 그대로 리턴!
  }, [content, isShowMore]);

  // console.log('dddddddddddddddddd'+content)

  return (
    <div>
      <Container>
        <Card
          border="danger"
          bg={"Dark".toLowerCase()}
          key={"Dark"}
          text={"white"}
          className="mb-2"
        >
          <Card.Body>
            <Card.Title>{author}</Card.Title>
            <Card.Text>
              <div>{shortContent}</div>
              <br />
              <div
                className="show-more"
                onClick={() => setIsShowMore(!isShowMore)}
              >
                {isShowMore ? "close" : "more..."}
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ReviewBox;
