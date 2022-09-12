import React from "react";
import { useState, useEffect } from "react";
import CourseItem from "../Components/CourseItem";
import styles from "./Courses.module.css";
import Events from "../Components/Events";
import { db } from "../firebase-config";
import {
  collection,
  getDocs
} from "firebase/firestore";

function Courses() {

  /*From db */
  const [courses, setCourses] = useState([])
  
  useEffect(() => {
    const coursesCollectionRef = collection(db, "courses");

    const getCourses = async () => {
      const data = await getDocs(coursesCollectionRef);
      setCourses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
    getCourses();
 
  }, []);


  /*Local storage*/
  let [basket, setBasket] = useState([])

  useEffect(() => {
    localStorage.setItem('courseBasket', JSON.stringify(basket))
  }, [basket]);

  function addCourseToBasket (courseData) {
    console.log("klickad " + courseData)
    setBasket(prevBasket => [...prevBasket, courseData]);
    console.log(basket)
  }


  return (
    <main data-testid="courses" className={styles.wrapper}>
      <h2 className={styles.heading}>[kurser]</h2>
      <section className={styles.courseWrapper}>
        {/* //map over the testcourses array and display it in the CourseItem component */}
        {courses
        .sort((course, nextCourse) => (course.details > nextCourse.details ? 1 : -1))
        .map((course) => (<CourseItem key={course.id} courseData={course} addCourseToBasket={addCourseToBasket} />))}
      </section>
      
      <Events />
      
    </main>
  );
}

export default Courses;

