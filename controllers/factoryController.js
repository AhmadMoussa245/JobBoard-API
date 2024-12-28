import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import APIFeature from '../utils/apiFeatures.js'
import Application from '../models/applicationModel.js';
import fs from "node:fs"

const getAllDocs=Model=>catchAsync(async(req,res,next)=>{
    let filter;
    if(req.params.id){
        filter={jobId:req.params.id};
    };
    
    const features=new APIFeature(
        Model.find(filter),req.query
    ).filter().keywordFilter();

    const doc=await features.query;

    res.status(200).json({
        status:'success',
        results:doc.length,
        data:{
            doc
        }
    })
});

const createDoc=Model=>catchAsync(async(req,res,next)=>{
    if(Model===Application){
        if(!req.body.applicantId){
            req.body.applicantId=req.user.id;
        }
        if(req.file){
            req.body.resume=req.file.originalname;
        }
    }

    const doc=await Model.create(req.body)
    
    res.status(201).json({
        status:'success',
        data:{
            doc
        }
    })
});

const getDoc=Model=>catchAsync(async(req,res,next)=>{
    
    const doc=await Model.findById(req.params.id);
    
    if(!doc){
        next(new AppError(
            'user not found',404
        ))
    };

    res.status(200).json({
        status:'success',
        data:{
            doc
        }
    });
});

const updateDoc=Model=>catchAsync(async(req,res,next)=>{
    const doc=await Model.findByIdAndUpdate(
        req.params.id,req.body,
        {new:true,runValidators:true}
    )
    if(!doc){
        return next(new AppError(
            'No document found',404
        ));
    };
    
    res.status(201).json({
        status:'success',
        data:{
            doc     
        }
    })
})

const deleteDoc=Model=>catchAsync(async(req,res,next)=>{
    const doc=await Model.findByIdAndDelete(req.params.id)
    if(!doc){
        return next(new AppError(
            'No document found',404
        ));
    };
    
    res.status(200).json({
        status:'success',
        data:{
            data:null
        }
    })
})

export default{
    getAllDocs,
    createDoc,
    getDoc,
    updateDoc,
    deleteDoc

}