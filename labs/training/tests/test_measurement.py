import unittest

from training_lab.measurement import model_flops, performance_summary


class MeasurementTests(unittest.TestCase):
    def test_independent_documents_do_not_count_cross_document_attention(self):
        config = {"dim": 16, "layers": 2}
        packed = model_flops(config, 32, [3, 5])
        self.assertEqual(packed, model_flops(config, 32, [3]) + model_flops(config, 32, [5]))
        self.assertLess(packed, model_flops(config, 32, [8]))

    def test_mfu_uses_joint_flops_over_joint_time_not_mean_of_step_rates(self):
        records = [{"step": 1, "step_seconds": 1, "step_tokens": 100, "estimated_model_flops": 1000},
                   {"step": 2, "step_seconds": 3, "step_tokens": 100, "estimated_model_flops": 1000},
                   {"step": 3, "step_seconds": 99, "step_tokens": 100, "instrumented": True}]
        result = performance_summary(records, 1000)
        self.assertEqual(result["tokens_per_second_per_gpu"], 50)
        self.assertEqual(result["estimated_mfu"], 0.5)


if __name__ == "__main__":
    unittest.main()
