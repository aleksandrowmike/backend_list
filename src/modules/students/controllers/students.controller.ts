import { Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { CreateStudentDto } from "../dto/create-student.dto";
import { UpdateRecordBook } from "../dto/update-record-book.dto";
import { IStudent } from "../interfaces/student.interface";
import { StudentsService } from "../services/students.service";

@Controller("students")
export class StudentsController {
  public fieldId: string;
  constructor(private readonly studentsService: StudentsService) {
  }
  @Get()
  async findAll(): Promise<IStudent[]> {
    return this.studentsService.findAll();
  }
  @Get("count")
  async count(): Promise<IStudent> {
    return this.studentsService.count();
  }
  @Get(":id")
  async findById(@Param("id") id: string): Promise<IStudent> {
    return this.studentsService.findById(id);
  }
  @Post("")
  async create(@Body() createStudentDto: CreateStudentDto): Promise<void> {
    await this.studentsService.create(createStudentDto);
  }
  @Post("upload")
  @UseInterceptors(FileInterceptor("image", {
    storage: diskStorage({
      destination: "./avatars",
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join("");
        this.fieldId = randomName;
        return cb(null, `${randomName}${extname(file.originalname)}`);
      }
    })
  }))
  uploadFile(@UploadedFile() file, @Res() res): void {
    res.send({filename: file.filename});
    console.log(file.path);
  }
  @Get("avatars/:fileId")
  async serveAvatar(@Param("fileId") fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: "avatars" });
  }
  // @Post("many")
  // async many(): Promise<void> {4;
  //   const body = [
  //     {
  //       "id": 1,
  //       "name": "Dollie Blevins",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "female",
  //       "email": "herringherring@rodeology.com",
  //       "phone": "+7 (865) 403-3347",
  //       "about": "Dolor in esse aliquip do laboris sunt anim do.",
  //       "country": "Vanuatu",
  //       "city": "Fontanelle",
  //       "birth": "Tue Mar 31 1998 21:25:30 GMT+0400 (Москва, летнее время)",
  //       "grade": 6,
  //       "recordBook": [
  //         {
  //           "period": "2019/2019",
  //           "semestr": 3,
  //           "discipline": {
  //             "Algebra": 1,
  //             "Geometry": 5,
  //             "Biologi": 3,
  //             "History": 1
  //           }
  //         },
  //         {
  //           "period": "2016/2017",
  //           "semestr": 8,
  //           "discipline": {
  //             "Chemestry": 5,
  //             "Physics": 3,
  //             "Economy": 2,
  //             "Art": 4
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 2,
  //       "name": "Mcguire Glenn",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "male",
  //       "email": "fergusonmcgowan@austech.com",
  //       "phone": "+7 (888) 504-2168",
  //       "about": "Ipsum magna adipisicing amet Lorem cillum ipsum magna anim cupidatat ut.",
  //       "country": "Moldova",
  //       "city": "Denio",
  //       "birth": "Mon Aug 04 2008 15:47:32 GMT+0400 (Москва, летнее время)",
  //       "grade": 10,
  //       "recordBook": [
  //         {
  //           "period": "2018/2016",
  //           "semestr": 1,
  //           "discipline": {
  //             "Algebra": 5,
  //             "Geometry": 5,
  //             "Biologi": 2,
  //             "History": 1
  //           }
  //         },
  //         {
  //           "period": "2017/2019",
  //           "semestr": 8,
  //           "discipline": {
  //             "Chemestry": 1,
  //             "Physics": 4,
  //             "Economy": 3,
  //             "Art": 5
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 3,
  //       "name": "Kayla Smith",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "female",
  //       "email": "wallconrad@trollery.com",
  //       "phone": "+7 (901) 452-2700",
  //       "about": "Do consequat culpa aute commodo eiusmod consectetur adipisicing consequat exercitation enim officia.",
  //       "country": "Honduras",
  //       "city": "Clayville",
  //       "birth": "Tue May 28 2002 18:00:31 GMT+0400 (Москва, летнее время)",
  //       "grade": 7,
  //       "recordBook": [
  //         {
  //           "period": "2019/2015",
  //           "semestr": 1,
  //           "discipline": {
  //             "Algebra": 1,
  //             "Geometry": 4,
  //             "Biologi": 5,
  //             "History": 2
  //           }
  //         },
  //         {
  //           "period": "2015/2016",
  //           "semestr": 3,
  //           "discipline": {
  //             "Chemestry": 4,
  //             "Physics": 3,
  //             "Economy": 3,
  //             "Art": 2
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 4,
  //       "name": "Taylor Mathis",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "female",
  //       "email": "rhodaperry@elentrix.com",
  //       "phone": "+7 (878) 569-3245",
  //       "about": "Ex do ut laborum quis deserunt exercitation anim in ipsum est culpa aute.",
  //       "country": "Spain",
  //       "city": "Callaghan",
  //       "birth": "Sat Mar 21 1998 04:01:40 GMT+0300 (Москва, стандартное время)",
  //       "grade": 2,
  //       "recordBook": [
  //         {
  //           "period": "2015/2018",
  //           "semestr": 3,
  //           "discipline": {
  //             "Algebra": 4,
  //             "Geometry": 3,
  //             "Biologi": 1,
  //             "History": 4
  //           }
  //         },
  //         {
  //           "period": "2018/2019",
  //           "semestr": 5,
  //           "discipline": {
  //             "Chemestry": 1,
  //             "Physics": 4,
  //             "Economy": 4,
  //             "Art": 5
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 5,
  //       "name": "Anita Roman",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "female",
  //       "email": "ochoagraham@manglo.com",
  //       "phone": "+7 (999) 417-2083",
  //       "about": "Anim fugiat ad tempor adipisicing velit aliquip tempor sunt laborum excepteur aliqua ex sunt aute.",
  //       "country": "Guyana",
  //       "city": "Boykin",
  //       "birth": "Sat Sep 08 2007 11:04:24 GMT+0400 (Москва, летнее время)",
  //       "grade": 4,
  //       "recordBook": [
  //         {
  //           "period": "2018/2015",
  //           "semestr": 7,
  //           "discipline": {
  //             "Algebra": 5,
  //             "Geometry": 2,
  //             "Biologi": 5,
  //             "History": 5
  //           }
  //         },
  //         {
  //           "period": "2017/2019",
  //           "semestr": 8,
  //           "discipline": {
  //             "Chemestry": 2,
  //             "Physics": 5,
  //             "Economy": 3,
  //             "Art": 2
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 6,
  //       "name": "Kelly Hardy",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "male",
  //       "email": "alisawolfe@acium.com",
  //       "phone": "+7 (940) 543-3744",
  //       "about": "Occaecat veniam sunt deserunt qui magna laborum dolor ex duis nulla dolor eiusmod.",
  //       "country": "Singapore",
  //       "city": "Florence",
  //       "birth": "Wed Jul 08 1998 19:36:01 GMT+0400 (Москва, летнее время)",
  //       "grade": 7,
  //       "recordBook": [
  //         {
  //           "period": "2015/2017",
  //           "semestr": 8,
  //           "discipline": {
  //             "Algebra": 5,
  //             "Geometry": 5,
  //             "Biologi": 4,
  //             "History": 1
  //           }
  //         },
  //         {
  //           "period": "2017/2018",
  //           "semestr": 3,
  //           "discipline": {
  //             "Chemestry": 4,
  //             "Physics": 3,
  //             "Economy": 4,
  //             "Art": 1
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 7,
  //       "name": "Frank Jacobs",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "male",
  //       "email": "estelleferguson@vantage.com",
  //       "phone": "+7 (823) 568-3641",
  //       "about": "Irure culpa voluptate in sit esse ut incididunt exercitation ad.",
  //       "country": "Gabon",
  //       "city": "Jessie",
  //       "birth": "Tue Sep 20 2005 14:24:35 GMT+0400 (Москва, летнее время)",
  //       "grade": 11,
  //       "recordBook": [
  //         {
  //           "period": "2019/2015",
  //           "semestr": 6,
  //           "discipline": {
  //             "Algebra": 1,
  //             "Geometry": 2,
  //             "Biologi": 5,
  //             "History": 1
  //           }
  //         },
  //         {
  //           "period": "2017/2016",
  //           "semestr": 6,
  //           "discipline": {
  //             "Chemestry": 4,
  //             "Physics": 4,
  //             "Economy": 5,
  //             "Art": 4
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 8,
  //       "name": "Julia Morton",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "female",
  //       "email": "maddendonovan@fuelton.com",
  //       "phone": "+7 (838) 476-2385",
  //       "about": "Veniam aute proident cupidatat reprehenderit nulla consequat consequat culpa eu nisi excepteur aute.",
  //       "country": "Marshall Islands",
  //       "city": "Boyd",
  //       "birth": "Tue Dec 18 2001 15:04:01 GMT+0300 (Москва, стандартное время)",
  //       "grade": 7,
  //       "recordBook": [
  //         {
  //           "period": "2015/2016",
  //           "semestr": 2,
  //           "discipline": {
  //             "Algebra": 5,
  //             "Geometry": 3,
  //             "Biologi": 5,
  //             "History": 2
  //           }
  //         },
  //         {
  //           "period": "2015/2019",
  //           "semestr": 3,
  //           "discipline": {
  //             "Chemestry": 2,
  //             "Physics": 3,
  //             "Economy": 4,
  //             "Art": 2
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 9,
  //       "name": "Wells Duffy",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "male",
  //       "email": "meaganwalsh@eventage.com",
  //       "phone": "+7 (919) 586-3563",
  //       "about": "Enim aliqua dolor ad est aliqua enim cupidatat ad minim qui.",
  //       "country": "Macedonia",
  //       "city": "Allentown",
  //       "birth": "Mon Mar 26 2007 04:08:39 GMT+0400 (Москва, летнее время)",
  //       "grade": 7,
  //       "recordBook": [
  //         {
  //           "period": "2017/2018",
  //           "semestr": 5,
  //           "discipline": {
  //             "Algebra": 2,
  //             "Geometry": 3,
  //             "Biologi": 3,
  //             "History": 1
  //           }
  //         },
  //         {
  //           "period": "2015/2016",
  //           "semestr": 5,
  //           "discipline": {
  //             "Chemestry": 1,
  //             "Physics": 3,
  //             "Economy": 2,
  //             "Art": 1
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 10,
  //       "name": "Julianne Marshall",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "female",
  //       "email": "irwinmaddox@omatom.com",
  //       "phone": "+7 (856) 416-3697",
  //       "about": "Id veniam nisi duis proident magna duis esse anim ex consequat ipsum sit.",
  //       "country": "Maldives",
  //       "city": "Dante",
  //       "birth": "Mon Jul 21 2008 00:51:34 GMT+0400 (Москва, летнее время)",
  //       "grade": 8,
  //       "recordBook": [
  //         {
  //           "period": "2015/2019",
  //           "semestr": 3,
  //           "discipline": {
  //             "Algebra": 1,
  //             "Geometry": 5,
  //             "Biologi": 1,
  //             "History": 2
  //           }
  //         },
  //         {
  //           "period": "2019/2016",
  //           "semestr": 6,
  //           "discipline": {
  //             "Chemestry": 4,
  //             "Physics": 4,
  //             "Economy": 5,
  //             "Art": 4
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 11,
  //       "name": "Boyd Sykes",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "male",
  //       "email": "torressnider@zensure.com",
  //       "phone": "+7 (873) 572-3322",
  //       "about": "Ullamco cillum eu ex et dolor laborum esse ex tempor anim.",
  //       "country": "Cambodia",
  //       "city": "Chalfant",
  //       "birth": "Thu Apr 22 1999 00:59:41 GMT+0400 (Москва, летнее время)",
  //       "grade": 11,
  //       "recordBook": [
  //         {
  //           "period": "2015/2019",
  //           "semestr": 6,
  //           "discipline": {
  //             "Algebra": 4,
  //             "Geometry": 1,
  //             "Biologi": 1,
  //             "History": 2
  //           }
  //         },
  //         {
  //           "period": "2016/2017",
  //           "semestr": 7,
  //           "discipline": {
  //             "Chemestry": 1,
  //             "Physics": 1,
  //             "Economy": 4,
  //             "Art": 4
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 12,
  //       "name": "Beatrice Hopkins",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "female",
  //       "email": "clarasalas@slofast.com",
  //       "phone": "+7 (901) 507-2404",
  //       "about": "Esse nisi minim laborum incididunt do minim in laboris exercitation quis laboris aliquip.",
  //       "country": "Barbados",
  //       "city": "Nelson",
  //       "birth": "Thu Jan 28 1999 12:27:29 GMT+0300 (Москва, стандартное время)",
  //       "grade": 6,
  //       "recordBook": [
  //         {
  //           "period": "2015/2019",
  //           "semestr": 5,
  //           "discipline": {
  //             "Algebra": 5,
  //             "Geometry": 4,
  //             "Biologi": 1,
  //             "History": 2
  //           }
  //         },
  //         {
  //           "period": "2017/2017",
  //           "semestr": 2,
  //           "discipline": {
  //             "Chemestry": 5,
  //             "Physics": 5,
  //             "Economy": 5,
  //             "Art": 3
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 13,
  //       "name": "West Rivas",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "male",
  //       "email": "lilycastaneda@dognosis.com",
  //       "phone": "+7 (833) 423-2300",
  //       "about": "Magna cillum adipisicing anim aliqua ea.",
  //       "country": "Denmark",
  //       "city": "Websterville",
  //       "birth": "Sat Sep 25 1999 04:06:11 GMT+0400 (Москва, летнее время)",
  //       "grade": 8,
  //       "recordBook": [
  //         {
  //           "period": "2018/2017",
  //           "semestr": 2,
  //           "discipline": {
  //             "Algebra": 4,
  //             "Geometry": 1,
  //             "Biologi": 2,
  //             "History": 2
  //           }
  //         },
  //         {
  //           "period": "2019/2019",
  //           "semestr": 3,
  //           "discipline": {
  //             "Chemestry": 2,
  //             "Physics": 5,
  //             "Economy": 4,
  //             "Art": 1
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 14,
  //       "name": "Travis Gaines",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "male",
  //       "email": "olsonbright@orbin.com",
  //       "phone": "+7 (887) 524-2848",
  //       "about": "Cupidatat duis velit officia quis ex.",
  //       "country": "Lebanon",
  //       "city": "Oley",
  //       "birth": "Thu Jan 10 2002 22:22:53 GMT+0300 (Москва, стандартное время)",
  //       "grade": 10,
  //       "recordBook": [
  //         {
  //           "period": "2016/2015",
  //           "semestr": 2,
  //           "discipline": {
  //             "Algebra": 3,
  //             "Geometry": 3,
  //             "Biologi": 5,
  //             "History": 2
  //           }
  //         },
  //         {
  //           "period": "2019/2018",
  //           "semestr": 3,
  //           "discipline": {
  //             "Chemestry": 2,
  //             "Physics": 5,
  //             "Economy": 5,
  //             "Art": 5
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 15,
  //       "name": "Jillian Larson",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "female",
  //       "email": "carterparrish@ecolight.com",
  //       "phone": "+7 (920) 402-3304",
  //       "about": "Laborum nisi mollit sint est sunt Lorem amet aliquip esse elit fugiat veniam elit deserunt.",
  //       "country": "Cuba",
  //       "city": "Elrama",
  //       "birth": "Wed Nov 24 1999 11:09:19 GMT+0300 (Москва, стандартное время)",
  //       "grade": 10,
  //       "recordBook": [
  //         {
  //           "period": "2015/2015",
  //           "semestr": 1,
  //           "discipline": {
  //             "Algebra": 5,
  //             "Geometry": 3,
  //             "Biologi": 1,
  //             "History": 1
  //           }
  //         },
  //         {
  //           "period": "2015/2019",
  //           "semestr": 2,
  //           "discipline": {
  //             "Chemestry": 4,
  //             "Physics": 2,
  //             "Economy": 1,
  //             "Art": 1
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 16,
  //       "name": "Flora Whitfield",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "female",
  //       "email": "leahmoreno@buzzness.com",
  //       "phone": "+7 (895) 570-3207",
  //       "about": "Ut ullamco laborum cupidatat incididunt.",
  //       "country": "Reunion",
  //       "city": "Mansfield",
  //       "birth": "Sun Sep 16 2001 19:52:24 GMT+0400 (Москва, летнее время)",
  //       "grade": 3,
  //       "recordBook": [
  //         {
  //           "period": "2016/2016",
  //           "semestr": 6,
  //           "discipline": {
  //             "Algebra": 2,
  //             "Geometry": 5,
  //             "Biologi": 4,
  //             "History": 2
  //           }
  //         },
  //         {
  //           "period": "2015/2016",
  //           "semestr": 1,
  //           "discipline": {
  //             "Chemestry": 2,
  //             "Physics": 2,
  //             "Economy": 1,
  //             "Art": 4
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 17,
  //       "name": "Schultz Bass",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "male",
  //       "email": "ellisonscott@exospeed.com",
  //       "phone": "+7 (953) 527-2196",
  //       "about": "Voluptate minim esse aute non deserunt.",
  //       "country": "Viet Nam",
  //       "city": "Osmond",
  //       "birth": "Sun Jul 14 2002 08:31:43 GMT+0400 (Москва, летнее время)",
  //       "grade": 3,
  //       "recordBook": [
  //         {
  //           "period": "2016/2016",
  //           "semestr": 7,
  //           "discipline": {
  //             "Algebra": 5,
  //             "Geometry": 4,
  //             "Biologi": 4,
  //             "History": 1
  //           }
  //         },
  //         {
  //           "period": "2015/2018",
  //           "semestr": 3,
  //           "discipline": {
  //             "Chemestry": 3,
  //             "Physics": 1,
  //             "Economy": 1,
  //             "Art": 3
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 18,
  //       "name": "Sykes Cooke",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "male",
  //       "email": "marilyncoleman@zerbina.com",
  //       "phone": "+7 (898) 564-3549",
  //       "about": "Pariatur consequat adipisicing culpa minim ad ex eu cillum laborum eiusmod consequat laborum excepteur esse.",
  //       "country": "Martinique",
  //       "city": "Churchill",
  //       "birth": "Sat May 22 1999 03:39:17 GMT+0400 (Москва, летнее время)",
  //       "grade": 3,
  //       "recordBook": [
  //         {
  //           "period": "2016/2016",
  //           "semestr": 2,
  //           "discipline": {
  //             "Algebra": 1,
  //             "Geometry": 3,
  //             "Biologi": 2,
  //             "History": 2
  //           }
  //         },
  //         {
  //           "period": "2018/2018",
  //           "semestr": 1,
  //           "discipline": {
  //             "Chemestry": 3,
  //             "Physics": 3,
  //             "Economy": 2,
  //             "Art": 5
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 19,
  //       "name": "Jerri Reese",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "female",
  //       "email": "beulahwilkerson@zensor.com",
  //       "phone": "+7 (869) 443-2037",
  //       "about": "Cupidatat in et anim cillum eiusmod Lorem tempor pariatur labore excepteur irure enim.",
  //       "country": "Philippines",
  //       "city": "Nash",
  //       "birth": "Thu Jul 11 2002 16:35:59 GMT+0400 (Москва, летнее время)",
  //       "grade": 7,
  //       "recordBook": [
  //         {
  //           "period": "2018/2019",
  //           "semestr": 1,
  //           "discipline": {
  //             "Algebra": 1,
  //             "Geometry": 3,
  //             "Biologi": 4,
  //             "History": 2
  //           }
  //         },
  //         {
  //           "period": "2019/2019",
  //           "semestr": 6,
  //           "discipline": {
  //             "Chemestry": 4,
  //             "Physics": 3,
  //             "Economy": 4,
  //             "Art": 5
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 20,
  //       "name": "Wendi Fulton",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "female",
  //       "email": "webstergregory@kneedles.com",
  //       "phone": "+7 (908) 513-2768",
  //       "about": "Nostrud ad labore culpa aliquip deserunt dolore mollit voluptate ullamco dolor proident minim dolor occaecat.",
  //       "country": "Heard and McDonald Islands",
  //       "city": "Bennett",
  //       "birth": "Tue Nov 07 2000 16:00:32 GMT+0300 (Москва, стандартное время)",
  //       "grade": 6,
  //       "recordBook": [
  //         {
  //           "period": "2016/2015",
  //           "semestr": 7,
  //           "discipline": {
  //             "Algebra": 3,
  //             "Geometry": 2,
  //             "Biologi": 5,
  //             "History": 1
  //           }
  //         },
  //         {
  //           "period": "2016/2015",
  //           "semestr": 8,
  //           "discipline": {
  //             "Chemestry": 1,
  //             "Physics": 3,
  //             "Economy": 5,
  //             "Art": 4
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 21,
  //       "name": "Joyce Hines",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "female",
  //       "email": "leemckinney@cedward.com",
  //       "phone": "+7 (921) 581-3097",
  //       "about": "Amet ex deserunt adipisicing fugiat fugiat quis ea cillum consectetur elit.",
  //       "country": "Cayman Islands",
  //       "city": "Nadine",
  //       "birth": "Sat Jul 26 2003 17:12:53 GMT+0400 (Москва, летнее время)",
  //       "grade": 11,
  //       "recordBook": [
  //         {
  //           "period": "2016/2017",
  //           "semestr": 6,
  //           "discipline": {
  //             "Algebra": 1,
  //             "Geometry": 4,
  //             "Biologi": 1,
  //             "History": 4
  //           }
  //         },
  //         {
  //           "period": "2016/2018",
  //           "semestr": 6,
  //           "discipline": {
  //             "Chemestry": 5,
  //             "Physics": 4,
  //             "Economy": 4,
  //             "Art": 4
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 22,
  //       "name": "Mendez Castillo",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "male",
  //       "email": "juliejackson@intradisk.com",
  //       "phone": "+7 (824) 522-2970",
  //       "about": "Enim quis ea consectetur sint non ut reprehenderit cillum consequat veniam excepteur.",
  //       "country": "Mongolia",
  //       "city": "Jackpot",
  //       "birth": "Tue Sep 02 2003 01:07:29 GMT+0400 (Москва, летнее время)",
  //       "grade": 8,
  //       "recordBook": [
  //         {
  //           "period": "2019/2018",
  //           "semestr": 1,
  //           "discipline": {
  //             "Algebra": 4,
  //             "Geometry": 1,
  //             "Biologi": 4,
  //             "History": 4
  //           }
  //         },
  //         {
  //           "period": "2018/2018",
  //           "semestr": 6,
  //           "discipline": {
  //             "Chemestry": 3,
  //             "Physics": 3,
  //             "Economy": 3,
  //             "Art": 2
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 23,
  //       "name": "Bartlett Houston",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "male",
  //       "email": "potterratliff@ecrater.com",
  //       "phone": "+7 (839) 514-3591",
  //       "about": "Dolore Lorem officia sunt quis nisi amet ea esse aliqua qui.",
  //       "country": "Papua New Guinea",
  //       "city": "Iberia",
  //       "birth": "Sun Jun 05 2005 18:03:43 GMT+0400 (Москва, летнее время)",
  //       "grade": 11,
  //       "recordBook": [
  //         {
  //           "period": "2017/2018",
  //           "semestr": 2,
  //           "discipline": {
  //             "Algebra": 4,
  //             "Geometry": 2,
  //             "Biologi": 1,
  //             "History": 3
  //           }
  //         },
  //         {
  //           "period": "2019/2019",
  //           "semestr": 5,
  //           "discipline": {
  //             "Chemestry": 5,
  //             "Physics": 4,
  //             "Economy": 5,
  //             "Art": 1
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 24,
  //       "name": "Preston Flynn",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "male",
  //       "email": "reedmiddleton@zappix.com",
  //       "phone": "+7 (901) 437-3478",
  //       "about": "Minim ex magna cupidatat consectetur sint dolor consectetur adipisicing nisi adipisicing.",
  //       "country": "Mozambique",
  //       "city": "Eagletown",
  //       "birth": "Sat Nov 29 2003 04:45:07 GMT+0300 (Москва, стандартное время)",
  //       "grade": 8,
  //       "recordBook": [
  //         {
  //           "period": "2016/2019",
  //           "semestr": 3,
  //           "discipline": {
  //             "Algebra": 5,
  //             "Geometry": 3,
  //             "Biologi": 1,
  //             "History": 1
  //           }
  //         },
  //         {
  //           "period": "2016/2016",
  //           "semestr": 6,
  //           "discipline": {
  //             "Chemestry": 2,
  //             "Physics": 2,
  //             "Economy": 3,
  //             "Art": 5
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 25,
  //       "name": "Suarez Sweeney",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "male",
  //       "email": "mccarthycasey@orbaxter.com",
  //       "phone": "+7 (915) 482-3565",
  //       "about": "Esse elit culpa exercitation aliquip occaecat.",
  //       "country": "Cape Verde",
  //       "city": "Ironton",
  //       "birth": "Tue Oct 21 2003 01:45:28 GMT+0400 (Москва, летнее время)",
  //       "grade": 1,
  //       "recordBook": [
  //         {
  //           "period": "2018/2015",
  //           "semestr": 3,
  //           "discipline": {
  //             "Algebra": 5,
  //             "Geometry": 4,
  //             "Biologi": 4,
  //             "History": 2
  //           }
  //         },
  //         {
  //           "period": "2015/2015",
  //           "semestr": 6,
  //           "discipline": {
  //             "Chemestry": 5,
  //             "Physics": 1,
  //             "Economy": 3,
  //             "Art": 2
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 26,
  //       "name": "Georgette Strong",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "female",
  //       "email": "gilliammcmillan@digigen.com",
  //       "phone": "+7 (945) 426-3955",
  //       "about": "Aliquip sunt ut sunt nostrud amet proident ea.",
  //       "country": "Guatemala",
  //       "city": "Mulino",
  //       "birth": "Sat Dec 25 1999 05:57:28 GMT+0300 (Москва, стандартное время)",
  //       "grade": 11,
  //       "recordBook": [
  //         {
  //           "period": "2015/2016",
  //           "semestr": 3,
  //           "discipline": {
  //             "Algebra": 5,
  //             "Geometry": 3,
  //             "Biologi": 3,
  //             "History": 3
  //           }
  //         },
  //         {
  //           "period": "2016/2019",
  //           "semestr": 2,
  //           "discipline": {
  //             "Chemestry": 3,
  //             "Physics": 5,
  //             "Economy": 1,
  //             "Art": 4
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 27,
  //       "name": "Cross Skinner",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "male",
  //       "email": "rosacrawford@aclima.com",
  //       "phone": "+7 (964) 512-2043",
  //       "about": "Non elit esse eu deserunt labore magna.",
  //       "country": "Svalbard and Jan Mayen Islands",
  //       "city": "Starks",
  //       "birth": "Tue Feb 26 2002 21:28:17 GMT+0300 (Москва, стандартное время)",
  //       "grade": 1,
  //       "recordBook": [
  //         {
  //           "period": "2019/2019",
  //           "semestr": 8,
  //           "discipline": {
  //             "Algebra": 1,
  //             "Geometry": 3,
  //             "Biologi": 5,
  //             "History": 4
  //           }
  //         },
  //         {
  //           "period": "2018/2016",
  //           "semestr": 4,
  //           "discipline": {
  //             "Chemestry": 5,
  //             "Physics": 1,
  //             "Economy": 1,
  //             "Art": 2
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 28,
  //       "name": "Diann Mckenzie",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "female",
  //       "email": "jasmineblack@konnect.com",
  //       "phone": "+7 (959) 429-3132",
  //       "about": "Do nulla amet duis ipsum ut sunt duis.",
  //       "country": "Japan",
  //       "city": "Escondida",
  //       "birth": "Sun Sep 16 2007 10:36:52 GMT+0400 (Москва, летнее время)",
  //       "grade": 9,
  //       "recordBook": [
  //         {
  //           "period": "2017/2015",
  //           "semestr": 3,
  //           "discipline": {
  //             "Algebra": 5,
  //             "Geometry": 5,
  //             "Biologi": 1,
  //             "History": 2
  //           }
  //         },
  //         {
  //           "period": "2015/2015",
  //           "semestr": 3,
  //           "discipline": {
  //             "Chemestry": 3,
  //             "Physics": 4,
  //             "Economy": 4,
  //             "Art": 2
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 29,
  //       "name": "Tammy Mccullough",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "female",
  //       "email": "amiesparks@gronk.com",
  //       "phone": "+7 (812) 423-2856",
  //       "about": "Cupidatat commodo minim duis laborum aute dolor ex amet amet deserunt incididunt.",
  //       "country": "Nauru",
  //       "city": "Thermal",
  //       "birth": "Wed Jul 27 2005 05:01:01 GMT+0400 (Москва, летнее время)",
  //       "grade": 9,
  //       "recordBook": [
  //         {
  //           "period": "2015/2019",
  //           "semestr": 5,
  //           "discipline": {
  //             "Algebra": 2,
  //             "Geometry": 1,
  //             "Biologi": 5,
  //             "History": 3
  //           }
  //         },
  //         {
  //           "period": "2016/2017",
  //           "semestr": 6,
  //           "discipline": {
  //             "Chemestry": 3,
  //             "Physics": 5,
  //             "Economy": 4,
  //             "Art": 5
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "id": 30,
  //       "name": "Brewer Dickson",
  //       "avatar": "http://dummyimage.com/246x218.png/5fa2dd/ffffff",
  //       "sex": "male",
  //       "email": "monicamcdowell@moltonic.com",
  //       "phone": "+7 (964) 597-2827",
  //       "about": "Fugiat officia culpa ipsum nulla occaecat dolor nulla aliquip fugiat ipsum culpa aliquip nisi.",
  //       "country": "Monaco",
  //       "city": "Woodruff",
  //       "birth": "Fri Dec 15 2006 20:42:43 GMT+0300 (Москва, стандартное время)",
  //       "grade": 2,
  //       "recordBook": [
  //         {
  //           "period": "2016/2017",
  //           "semestr": 2,
  //           "discipline": {
  //             "Algebra": 3,
  //             "Geometry": 2,
  //             "Biologi": 2,
  //             "History": 3
  //           }
  //         },
  //         {
  //           "period": "2017/2019",
  //           "semestr": 8,
  //           "discipline": {
  //             "Chemestry": 5,
  //             "Physics": 3,
  //             "Economy": 4,
  //             "Art": 3
  //           }
  //         },
  //       ]
  //     },
  //   ];
  //   for (let i = 0; i < body.length; i++) {
  //     await this.studentsService.many(body[i]);
  //   }
  // }
  @Put(":id")
  async update(@Param("id") id: string, @Body() updateStudentDto: CreateStudentDto): Promise<void> {
    await this.studentsService.updateById(id, updateStudentDto);
  }

  @Put(":id/record")
  async updateRecordBook(@Param("id") id: string, @Body() updateRecordBookDto: UpdateRecordBook): Promise<void> {
    await this.studentsService.updateRecordBookById(id, updateRecordBookDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<void> {
    await this.studentsService.deleteOne(id);
  }
  // @Delete()
  // async deleteAll(): Promise<void> {
  //   await this.studentsService.deleteAll();
  // }
}
// {
//   "id": 1,
//   "firstName": "Mike",
//   "lastName": "Gorbachev",
//   "middleName": "Aleksandrovich",
//   "birth": "07.10.1998",
//   "score": 3
// }
