<template>
    <div class="contactInputsCon">
        <!-- Name -->
        <label for="nameInp">Name</label>
        <input id="nameInp" type="text" class="inputStyle" v-model="name">
        <!-- Email -->
        <label for="emailInp">Email Address</label>
        <input id="emailInp" type="text" class="inputStyle" v-model="email">
        <!-- Subject -->
        <label for="subjInp">Subject</label>
        <select id="subjInp" class="inputStyle" v-model="subject">
            <option value="question">Question</option>
            <option value="information">More Information</option>
            <option value="business">Business Inquiry</option>
            <option value="other">Other</option>
        </select>
        <!-- Message -->
        <label for="messageInp">Message</label>
        <textarea id="messageInp" class="textareaStyle" v-model="message"></textarea>
        <!-- Send Btn -->
        <button class="sendContactBtn">Send</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            subject: 'question',
            message: ''
        }
    }
}
</script>

<style scoped>
.inputStyle {
    margin-top: 5px;
    margin-bottom: 10px;
}
.textareaStyle {
    margin-top: 5px;
}
.sendContactBtn {
    width: 100%;
    border-radius: 10px;
    background-color: var(--accent-1);
    padding: 10px 40px;
    color: #FFF;
    font-size: 14px;
    font-weight: bold;
    transition: 0.2s;
    cursor: pointer;
    border: none;
    margin-top: 15px;
}
.sendContactBtn:hover {
    background-color: var(--accent-1-hover);
}
</style>