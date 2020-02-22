const Tags = require("../models/tags")
const throwError = require("../utility/utility")
const { validationResult } = require("express-validator")

exports.createTag = (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body.tag)
    if (!errors.isEmpty()) {
        throwError("Provided input not correct", 422, errors.array())
    }
    const tags = new Tags({
        title: req.body.tag
    });
    tags.save().then(result => {
        res.status(200).json({ result: result })
    });
}

exports.updateTag = (req, res, next) => {
    // const errors = validationResult(req);
    // if (errors) {
    //     throwError("some issue with provided input", 422, errors.array())
    // }
    const tagID = req.params.tagID;
    Tags.findById(tagID).then(tag => {
        return tag.update({ usageCount: (tag.usageCount + 1) })
    }).then(result => {
        res.status(200).json({ result: result })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.deleteTag = (req, res, next) => {
    // const errors = validationResult(req)
    // if (errors) {
    //     throwError("some issues with provided input", 422, errors.array())
    // }
    const tagID = req.params.tagID;
    console.log("tag being deleted:- "+ tagID)
    Tags.findByIdAndDelete(tagID).then(result => {
        res.status(200).json({ result: result })
    }).catch(err => {
        console.log(err)
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.getTag = (req, res, next) => {
    // const errors = validationResult(req)
    // if (errors) {
    //     throwError("some issue with given input", 422, errors.array());
    // }
    const tagID = req.params.tagID;
    Tags.findById(tagID).then(tag => {
        if (!tag) {
            throwError("Tag could not be found", 404)
        }
        res.status(200).json({ data: tag })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.getAllTags = (req, res, next) => {
    Tags.find().then(AllTags => {
        if (!AllTags) {
            throwError("Tags could not be fetched", 404)
        } else {
            res.status(200).json({ data: AllTags })
        }
    }).catch(error => {
        throwError("Tags could not be fetched", 500, error)
    })
}