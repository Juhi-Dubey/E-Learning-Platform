const Enrollment = require("../models/Enrollment");
const Course = require('../models/Course');


exports.enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const course = await Course.findById(courseId);

        if(!course){
            return res.send(404).json({
                message: "Course not found",
            });
        }

        const existingEnrollment = await Enrollment.findOne({
            userId: req.user.id,
            courseId,
        });

        if(existingEnrollment){
            return res.status(400).json({
                message: "Already enrolled",
            });
        }

        const enrollment = await Enrollment.create({
            userId: req.user.id,
            courseId,
            progress: 0,
        });

        res.status(201).json(enrollment);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


exports.getMyEnrollments = async (req, res) => {
    try{
        const enrollments = await Enrollment.find({
            userId: req.user.id,
        }).populate("courseId");

        res.json(enrollments);
    }catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};


exports.updateProgress = async (req, res) => {
    try {
        const {progress} = req.body;

        const enrollment = await Enrollment.findById(
            req.params.id
        );

        if(!enrollment){
            return res.status(404).json({
                message: "Enrollment not found",
            });
        }

        enrollment.progress = progress;
        await enrollment.save();

        res.json(enrollment);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

