class APIFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    //job seekers to search jobs by keyword,
    // category, location, and salary range
    filter(){
        const queryObj={...this.queryStr};
        const wantedFields=['category','location','salaryRange'];
        const finalObj={};
        wantedFields.forEach(el=>finalObj[el]=queryObj[el]);
        
        let queryString=JSON.stringify(finalObj);
        console.log(queryString)
        this.query=this.query.find(JSON.parse(queryString));

        return this;
    }

    keywordFilter(){
        if(!this.queryStr.keywords)
            return this
        
        const keywordRegex = new RegExp(this.queryStr.keywords, 'i');

        // Search across multiple fields using $or
        this.query =this.query.find({
            $or: [
                { jobTitle: { $regex: keywordRegex } },
                { description: { $regex: keywordRegex } },
                { employer: { $regex: keywordRegex } },
                { location: { $regex: keywordRegex } },
                { salaryRange: { $regex: keywordRegex } },
                { category: { $regex: keywordRegex } },
                { status: { $regex: keywordRegex } },
            ],
        });
        return this
    }

}

export default APIFeatures;