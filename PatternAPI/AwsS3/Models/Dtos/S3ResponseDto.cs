﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AwsS3.Models.Dtos
{
    public class S3ResponseDto
    {
        public int StatusCode { get; set; }
        public string? Message { get; set; }
        public string? FileName { get; set; }
    }
}
