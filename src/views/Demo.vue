<template>
	<div class="min-h-screen bg-gray-50 flex flex-col items-center p-6">
		<el-card class="w-full max-w-3xl">
			<div class="text-center mb-6">
				<h1 class="text-3xl font-bold text-blue-600">
					SmartFibers AI Detection
				</h1>
				<p class="text-gray-600">
					Upload a fiber cake image for high-precision AI analysis
				</p>
			</div>

			<el-upload
				class="upload-demo"
				drag
				action="/api/upload"
				:on-success="handleSuccess"
				:on-error="handleError"
				:show-file-list="false"
				:before-upload="beforeUpload"
			>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">
					Drop file here or <em>click to upload</em>
				</div>
				<div class="el-upload__tip" slot="tip">
					Only .png/.jpg files are supported
				</div>
			</el-upload>

			<div v-if="loading" class="text-center mt-6">
				<el-spinner type="spinner" class="text-blue-500" />
				<p class="text-gray-500 mt-2">
					Processing image, please wait...
				</p>
			</div>

			<div
				v-if="resultUrl"
				class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
			>
				<div class="text-center">
					<p class="text-gray-500 mb-2">Original Image</p>
					<img
						:src="originalUrl"
						class="rounded shadow-md mx-auto max-h-80"
					/>
				</div>
				<div class="text-center">
					<p class="text-gray-500 mb-2">Processed Image</p>
					<img
						:src="resultUrl"
						class="rounded shadow-md mx-auto max-h-80"
					/>
				</div>
				<div class="col-span-2 text-center">
					<el-button type="primary" @click="downloadResult"
						>Download Result</el-button
					>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const originalUrl = ref('');
const resultUrl = ref('');
const loading = ref(false);

const handleSuccess = (response, file) => {
	originalUrl.value = URL.createObjectURL(file.raw);
	loading.value = true;

	// Simulate API delay or call your actual backend result endpoint
	setTimeout(() => {
		resultUrl.value = response.processedImageUrl;
		loading.value = false;
	}, 2000);
};

const handleError = () => {
	ElMessage.error('Upload failed, please try again.');
};

const beforeUpload = (file) => {
	const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isImage) {
		ElMessage.error('Only PNG or JPG images are allowed');
	}
	return isImage;
};

const downloadResult = () => {
	const link = document.createElement('a');
	link.href = resultUrl.value;
	link.download = 'processed_result.png';
	link.click();
};
</script>

<style scoped>
.upload-demo {
	border: 2px dashed #d9d9d9;
	border-radius: 8px;
	padding: 40px;
	text-align: center;
	background-color: #fafafa;
	transition: border-color 0.3s;
}
.upload-demo:hover {
	border-color: #409eff;
}
</style>
